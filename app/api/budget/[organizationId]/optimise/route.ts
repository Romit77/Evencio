import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(
  req: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  console.log("POST optimize - Organization ID:", organizationId);

  try {
    const budget = await prisma.budget.findUnique({
      where: { orgId: organizationId },
      include: { expenses: true },
    });

    console.log("Budget query result:", budget ? "Found" : "Not found");

    if (!budget) {
      console.log("No budget found for organization ID:", organizationId);
      return NextResponse.json(
        {
          error: "Budget not found",
          message: `No budget exists for organization ID: ${organizationId}`,
        },
        { status: 404 }
      );
    }

    if (!budget.expenses || budget.expenses.length === 0) {
      console.log("Budget has no expenses");
      return NextResponse.json(
        {
          error: "No expenses found",
          message: "This budget doesn't have any expenses to optimize",
        },
        { status: 400 }
      );
    }

    console.log("Found budget with total:", budget.total);
    console.log("Number of expenses:", budget.expenses.length);

    const expensesText = budget.expenses
      .map((exp) => `  ${exp.reason}: ${exp.amount}`)
      .join("\n");

    const prompt = `
You are a financial optimization expert. Given a total budget and a list of expenses, your task is to analyze the expenses and provide a revised list of expenses with optimized amounts to reduce costs, along with actionable suggestions to achieve these savings. Only give suggestions from the expenses listed. The total budget must not be exceeded, and the optimized expenses should be practical and realistic.

Input:
- Total Budget: ${budget.total}
- Current Expenses:
${expensesText}

Output:
Return a JSON object with the following structure:
{
  "optimizedExpenses": [
    { "reason": "string", "amount": number },
    ...
  ],
  "suggestions": [
    "string",
    ...
  ]
}
`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let optimizedData;
    try {
      const jsonString = responseText.replace(/```json\n|```/g, "").trim();
      optimizedData = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return NextResponse.json(
        { error: "Failed to parse optimization response" },
        { status: 500 }
      );
    }

    if (
      !optimizedData.optimizedExpenses ||
      !Array.isArray(optimizedData.optimizedExpenses) ||
      !optimizedData.suggestions ||
      !Array.isArray(optimizedData.suggestions)
    ) {
      return NextResponse.json(
        { error: "Invalid response format from Gemini API" },
        { status: 500 }
      );
    }

    console.log("Successfully generated optimization");
    return NextResponse.json(optimizedData);
  } catch (error: any) {
    console.error("Error in optimize endpoint:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 }
    );
  }
}
