import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  console.log("GET budget - Organization ID:", organizationId);

  const budget = await prisma.budget.findUnique({
    where: { orgId: organizationId },
    include: { expenses: true },
  });

  console.log("Budget found:", budget ? "Yes" : "No");

  return NextResponse.json(budget || { total: 0, expenses: [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  console.log("POST budget - Organization ID:", organizationId);

  const data = await req.json();
  const total: number = parseFloat(data.total);
  const expenses: Array<{ reason: string; amount: number | string }> =
    data.expenses;

  console.log("Received budget data:", {
    total,
    expensesCount: expenses.length,
  });

  let budget = await prisma.budget.findUnique({
    where: { orgId: organizationId },
  });

  console.log("Existing budget found:", budget ? "Yes" : "No");

  if (!budget) {
    console.log("Creating new budget for orgId:", organizationId);
    budget = await prisma.budget.create({
      data: {
        orgId: organizationId,
        total,
        expenses: {
          create: expenses.map((exp) => ({
            reason: exp.reason,
            amount: parseFloat(exp.amount.toString()),
          })),
        },
      },
      include: { expenses: true },
    });
    console.log("New budget created with ID:", budget.id);
  } else {
    console.log("Updating budget for orgId:", organizationId);
    budget = await prisma.budget.update({
      where: { orgId: organizationId },
      data: {
        total,
        expenses: {
          deleteMany: {},
          create: expenses.map((exp) => ({
            reason: exp.reason,
            amount: parseFloat(exp.amount.toString()),
          })),
        },
      },
      include: { expenses: true },
    });
    console.log("Budget updated");
  }

  return NextResponse.json(budget, { status: 201 });
}
