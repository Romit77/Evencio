import { Judge } from "@/lib/scrape";

// Conversion rate: 1 USD = 83 INR
const USD_TO_INR = 83;

interface JudgeListProps {
  judges: Judge[];
  budget?: number;
  title: string;
  currency?: "USD" | "INR"; 
}

export default function JudgeList({ judges, budget, title, currency = "USD" }: JudgeListProps) {
  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      {judges.length === 0 ? (
        <p className="text-gray-600">No judges found.</p>
      ) : (
        <ul className="space-y-4">
          {judges
            .filter((judge) => {
              const rateInSelectedCurrency = currency === "INR" ? judge.rate * USD_TO_INR : judge.rate;
              return !budget || rateInSelectedCurrency <= budget;
            })
            .map((judge) => {
              const rateInSelectedCurrency = currency === "INR" ? judge.rate * USD_TO_INR : judge.rate;
              const symbol = currency === "INR" ? "₹" : "$";
              return (
                <li key={judge.name} className="p-4 bg-gray-100 rounded-md shadow-sm">
                  <p className="text-gray-800">
                    <strong>{judge.name}</strong>
                  </p>
                  <p className="text-gray-600">Expertise: {judge.expertise}</p>
                  <p className="text-gray-600">Availability: {judge.availability}</p>
                  <p className="text-gray-600">
                    Rate: {symbol}
                    {rateInSelectedCurrency.toLocaleString("en-IN")}/hr
                  </p>
                  <p className="text-gray-600">Relevance: {judge.relevanceScore}%</p>
                  {judge.location && <p className="text-gray-600">Location: {judge.location}</p>}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}