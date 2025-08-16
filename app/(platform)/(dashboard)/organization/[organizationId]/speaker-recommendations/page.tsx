"use client";

import { useState } from "react";
import JudgeList from "@/components/form/JudgeList";
import { Judge } from "@/lib/scrape";

const USD_TO_INR = 83;

export default function JudgeRecommendation() {
  const [expertise, setExpertise] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dbJudges, setDbJudges] = useState<Judge[]>([]);
  const [scrapedJudges, setScrapedJudges] = useState<Judge[]>([]);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  const [scrapeLoading, setScrapeLoading] = useState<boolean>(false);

  const categories = [
    "business",
    "sales-marketing",
    "funding",
    "product-design",
    "technology",
    "skills-management",
    "industries",
    "other",
  ];

  const handleDbSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertise) return;
    setDbLoading(true);

    try {
      const res = await fetch(
        `/api/judges?theme=${encodeURIComponent(expertise)}`
      );
      if (res.ok) {
        const data = await res.json();
        setDbJudges(data.judges);
      } else {
        console.error("Failed to fetch judges from DB");
      }
    } catch (error) {
      console.error("Error fetching judges:", error);
    } finally {
      setDbLoading(false);
    }
  };

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    setScrapeLoading(true);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventTheme: category }),
      });

      if (res.ok) {
        const { judges: fetchedJudges } = await res.json();
        setScrapedJudges(fetchedJudges);
        const dbRes = await fetch(
          `/api/judges?theme=${encodeURIComponent(expertise)}`
        );
        if (dbRes.ok) {
          const data = await dbRes.json();
          setDbJudges(data.judges);
        }
      } else {
        console.error("Scraping failed");
      }
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      setScrapeLoading(false);
    }
  };

  const budgetValue = budget ? parseFloat(budget) * USD_TO_INR : undefined;

  return (
    <div className="bg-gray-50">
      <div className="space-y-6 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Search Existing Judges
          </h2>
          <form onSubmit={handleDbSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expertise
                </label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full p-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AI, Blockchain"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter maximum hourly rate in INR"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={dbLoading || !expertise}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {dbLoading ? "Searching..." : "Search Database"}
            </button>
          </form>

          <div className="mt-6">
            {dbLoading ? (
              <p className="text-gray-600">Loading judges from database...</p>
            ) : dbJudges.length > 0 ? (
              <JudgeList
                judges={dbJudges}
                budget={budgetValue}
                title="Judges Found in Database"
                currency="INR"
              />
            ) : (
              <div className="text-gray-600">
                <p>
                  No judges found in the database for{" "}
                  <span className="font-semibold">{expertise}</span>.
                </p>
                <p className="mt-2">Try scraping new judges below.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Scrape New Judges
          </h2>
          <form onSubmit={handleScrape} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace("-", " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter maximum hourly rate in INR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={scrapeLoading || !category}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {scrapeLoading ? "Scraping..." : "Scrape New Judges"}
            </button>
          </form>

          {scrapedJudges.length > 0 && (
            <div className="mt-6">
              <JudgeList
                judges={scrapedJudges}
                budget={budgetValue}
                title="Newly Scraped Judges"
                currency="INR"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
