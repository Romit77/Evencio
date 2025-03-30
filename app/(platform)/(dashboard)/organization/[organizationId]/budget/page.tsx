"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useOrganization } from "@clerk/nextjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BudgetPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId } = params;
  console.log("Organization ID in page:", organizationId);

  const [budget, setBudget] = useState<{
    total: number;
    expenses: { reason: string; amount: number }[];
  }>({ total: 0, expenses: [] });
  const [totalBudget, setTotalBudget] = useState("");
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState<
    { reason: string; amount: string }[]
  >([]);
  const [optimizedData, setOptimizedData] = useState<{
    optimizedExpenses: { reason: string; amount: number }[];
    suggestions: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBudget = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/budget/${organizationId}`);
        const data = await res.json();
        console.log("Fetched budget data:", data);
        setBudget(data);
      } catch (err) {
        console.error("Error fetching budget:", err);
        setError("Failed to load budget data");
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [organizationId]);

  const addExpense = () => {
    if (!expenseReason.trim() || !expenseAmount.trim()) return;
    setExpenses([
      ...expenses,
      { reason: expenseReason, amount: expenseAmount },
    ]);
    setExpenseReason("");
    setExpenseAmount("");
  };

  const saveBudget = async () => {
    if (!totalBudget.trim() || expenses.length === 0) {
      alert("Please enter a total budget and at least one expense");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/budget/${organizationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total: totalBudget, expenses }),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to save budget: ${res.status} ${res.statusText}`
        );
      }

      const updatedBudget = await res.json();
      console.log("Saved budget:", updatedBudget);
      setBudget(updatedBudget);
      setTotalBudget("");
      setExpenses([]);
      alert("Budget saved successfully!");
    } catch (err: any) {
      console.error("Error saving budget:", err);
      setError(`Failed to save budget: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const optimizeExpenses = async () => {
    if (!budget || !budget.expenses || budget.expenses.length === 0) {
      alert("Please save a budget with expenses before optimizing");
      return;
    }

    setOptimizing(true);
    setError("");

    const url = `/api/budget/${organizationId}/optimise`;
    console.log("Optimizing budget - URL:", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("Optimization response status:", res.status);

      if (!res.ok) {
        let errorMessage = `Error ${res.status}: ${res.statusText}`;

        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {}

        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("Optimization result:", data);
      setOptimizedData(data);
    } catch (err: any) {
      console.error("Optimization error:", err);
      setError(`Failed to optimize: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setOptimizing(false);
    }
  };

  const clearAllExpenses = () => {
    setTotalBudget("");
    setExpenseReason("");
    setExpenseAmount("");
    setExpenses([]);
    setBudget({ total: 0, expenses: [] });
    setOptimizedData(null);
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        align: "start" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Budget Expenses",
        font: {
          size: 16,
          weight: 700,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          autoSkip: false,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Amount ($)",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  const currentExpensesData = {
    labels: budget.expenses.map((exp) => exp.reason),
    datasets: [
      {
        label: "Current Expenses",
        data: budget.expenses.map((exp) => exp.amount),
        backgroundColor: "rgba(79, 70, 229, 0.7)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
        maxBarThickness: 35,
      },
    ],
  };

  const optimizedExpensesData = optimizedData
    ? {
        labels: optimizedData.optimizedExpenses.map((exp) => exp.reason),
        datasets: [
          {
            label: "Optimized Expenses",
            data: optimizedData.optimizedExpenses.map((exp) => exp.amount),
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 20,
            maxBarThickness: 35,
          },
        ],
      }
    : null;

  // Comparison chart data calculation
  const comparisonLabels = optimizedData
    ? Array.from(
        new Set([
          ...budget.expenses.map((exp) => exp.reason),
          ...optimizedData.optimizedExpenses.map((exp) => exp.reason),
        ])
      ).sort()
    : [];

  const currentComparisonData = optimizedData
    ? comparisonLabels.map((label) => {
        const expense = budget.expenses.find((exp) => exp.reason === label);
        return expense ? expense.amount : 0;
      })
    : [];

  const optimizedComparisonData = optimizedData
    ? comparisonLabels.map((label) => {
        const expense = optimizedData.optimizedExpenses.find(
          (exp) => exp.reason === label
        );
        return expense ? expense.amount : 0;
      })
    : [];

  const comparisonData = optimizedData
    ? {
        labels: comparisonLabels,
        datasets: [
          {
            label: "Current Expenses",
            data: currentComparisonData,
            backgroundColor: "rgba(79, 70, 229, 0.7)",
            borderColor: "rgba(79, 70, 229, 1)",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 20,
            maxBarThickness: 35,
          },
          {
            label: "Optimized Expenses",
            data: optimizedComparisonData,
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 20,
            maxBarThickness: 35,
          },
        ],
      }
    : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Budget Management
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Set Budget and Expenses
        </h2>
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Total Budget"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            value={expenseReason}
            onChange={(e) => setExpenseReason(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Expense Reason"
          />
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Amount"
          />
          <button
            onClick={addExpense}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 shadow-md"
            disabled={saving}
          >
            Add Expense
          </button>
        </div>

        {expenses.length > 0 && (
          <div className="mb-4 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">
              Current Expense List:
            </h3>
            <ul className="list-disc pl-5">
              {expenses.map((exp, idx) => (
                <li key={idx} className="mb-1">
                  <span className="font-medium">{exp.reason}:</span> $
                  {exp.amount}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={saveBudget}
            className="bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-800 transition duration-200 shadow-md flex items-center"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Budget"
            )}
          </button>
          <button
            onClick={optimizeExpenses}
            className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-800 transition duration-200 shadow-md flex items-center"
            disabled={optimizing || budget.expenses.length === 0}
          >
            {optimizing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Optimizing...
              </>
            ) : (
              "Optimize Expenses"
            )}
          </button>
          <button
            onClick={clearAllExpenses}
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md flex items-center"
            disabled={saving || optimizing}
          >
            Clear All Expenses
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Current Budget
          </h2>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <h3 className="font-semibold mt-2 text-gray-700">Expenses:</h3>
            <div className="space-y-2 mt-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded mt-6"></div>
          </div>
        </div>
      ) : budget && budget.expenses && budget.expenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {optimizing ? (
            <div className="bg-white p-6 rounded-lg shadow-md order-1 md:order-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Optimization Results
              </h2>
              <div className="animate-pulse">
                <h3 className="font-semibold mt-2 text-gray-700">
                  Optimized Expenses:
                </h3>
                <div className="space-y-2 mt-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <h3 className="font-semibold mt-4 text-gray-700">
                  Suggestions:
                </h3>
                <div className="space-y-2 mt-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded mt-6"></div>
              </div>
            </div>
          ) : optimizedData ? (
            <div className="bg-white p-6 rounded-lg shadow-md order-1 md:order-1 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Optimization Results
              </h2>

              <div className="h-64 w-full mb-4 flex-grow">
                {optimizedExpensesData && (
                  <Bar data={optimizedExpensesData} options={chartOptions} />
                )}
              </div>

              <h3 className="font-semibold text-lg text-gray-700 mt-4 mb-3">
                Optimized Expenses:
              </h3>
              <div className="mb-6 overflow-auto max-h-40 bg-gray-50 p-3 rounded">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-semibold text-gray-700 pb-2">
                        Category
                      </th>
                      <th className="text-right text-sm font-semibold text-gray-700 pb-2">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizedData.optimizedExpenses.map((exp, idx) => (
                      <tr key={idx} className="border-t border-gray-200">
                        <td className="py-2 text-gray-800">{exp.reason}</td>
                        <td className="py-2 text-right text-gray-800">
                          ${exp.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Current Budget section */}
          <div className="bg-white p-6 rounded-lg shadow-md order-2 md:order-2 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Current Budget
            </h2>
            <p className="text-lg font-medium mb-3">
              Total Budget:{" "}
              <span className="text-indigo-600">${budget.total}</span>
            </p>

            <div className="h-64 w-full mb-4 flex-grow">
              <Bar data={currentExpensesData} options={chartOptions} />
            </div>

            <h3 className="font-semibold text-lg text-gray-700 mt-4 mb-3">
              Current Expenses:
            </h3>
            <div className="overflow-auto max-h-40 bg-gray-50 p-3 rounded">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-700 pb-2">
                      Category
                    </th>
                    <th className="text-right text-sm font-semibold text-gray-700 pb-2">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budget.expenses.map((exp, idx: number) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="py-2 text-gray-800">{exp.reason}</td>
                      <td className="py-2 text-right text-gray-800">
                        ${exp.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {optimizedData && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            Optimization Suggestions
          </h2>

          <div className="mt-4">
            {optimizedData.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="mb-4 bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm"
              >
                <p className="text-gray-800 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg text-gray-700 mb-4">
              Expense Comparison
            </h3>
            <div className="h-96 w-full bg-gray-50 p-4 rounded-lg">
              {comparisonData && (
                <Bar
                  data={comparisonData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        ...chartOptions.plugins.title,
                        text: "Current vs. Optimized Expenses",
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
