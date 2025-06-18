import React, { useState, useEffect } from "react";
import { fetchRecommendations } from "./apiService";
import SearchResults from "./SearchResults";

function SearchForm() {
  const [mood, setMood] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("");
  const [region, setRegion] = useState("US");
  const [platform, setPlatform] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood && !timeAvailable && !region && !platform) {
      setError("Please select at least one filter to search.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await fetchRecommendations({ mood, timeAvailable, region, platform });
      setResults(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}

        <div>
          <label className="block mb-1 text-sm font-medium">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Mood</option>
            <option value="feel-good">Feel-Good</option>
            <option value="intense">Intense</option>
            <option value="romantic">Romantic</option>
            <option value="funny">Funny</option>
            <option value="scary">Scary</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Time Available</label>
          <select
            value={timeAvailable}
            onChange={(e) => setTimeAvailable(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Any Length</option>
            <option value="short">Under 60 min</option>
            <option value="medium">60–120 min</option>
            <option value="long">Over 120 min</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            {[
              { code: "US", name: "🇺🇸 United States" },
              { code: "CA", name: "🇨🇦 Canada" },
              { code: "GB", name: "🇬🇧 United Kingdom" },
              { code: "IN", name: "🇮🇳 India" },
              { code: "AU", name: "🇦🇺 Australia" },
              { code: "DE", name: "🇩🇪 Germany" },
              { code: "FR", name: "🇫🇷 France" },
              { code: "BR", name: "🇧🇷 Brazil" },
              { code: "JP", name: "🇯🇵 Japan" },
              { code: "KR", name: "🇰🇷 South Korea" }
            ].map(({ code, name }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            {[
              { id: 8, name: "Netflix" },
              { id: 9, name: "Amazon Prime" },
              { id: 15, name: "Hulu" },
              { id: 384, name: "HBO Max" },
              { id: 531, name: "Apple TV+" },
              { id: 337, name: "YouTube" },
              { id: 283, name: "Paramount+" },
              { id: 273, name: "Peacock" },
              { id: 192, name: "YouTube Premium" },
              { id: 350, name: "Disney+" },
              { id: 2, name: "iTunes" },
              { id: 3, name: "Google Play Movies" }
            ].map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Searching..." : "Find Something to Watch"}
          </button>
        </div>
      </form>

      <SearchResults results={results} />
    </div>
  );
}

export default SearchForm;

