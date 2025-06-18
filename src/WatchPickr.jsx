import { useState, useEffect } from "react";
import { fetchRecommendations } from "./api";
import { findStreamingAvailability } from "./justwatch";

const platformCache = new Map();

const providerLogos = {
  "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "Hulu": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg",
  "Prime Video": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  "Disney+": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  "HBO Max": "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
  "Apple TV+": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_TV_Plus_Logo.svg",
  "Paramount+": "https://upload.wikimedia.org/wikipedia/commons/4/48/Paramount%2B_logo.svg",
  "Peacock": "https://upload.wikimedia.org/wikipedia/commons/6/67/Peacock_logo.svg"
};

export default function WatchPickr() {
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("tv");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const moods = ["Chill", "Laugh", "Thriller", "Feel-Good", "Background Noise"];
  const times = ["30 min", "1 hour", "2+ hours"];
  const platforms = ["Netflix", "Hulu", "Prime", "Disney+", "HBO"];
  const types = [
    { label: "TV Shows", value: "tv" },
    { label: "Movies", value: "movie" }
  ];

  const enrichWithPlatform = async (results) => {
    const enriched = await Promise.all(results.map(async (item) => {
      if (platformCache.has(item.title)) {
        return { ...item, ...platformCache.get(item.title) };
      }
      const availability = await findStreamingAvailability(item.title);
      const enrichedItem = { ...item, platform: availability.platforms, links: availability.links };
      platformCache.set(item.title, enrichedItem);
      return enrichedItem;
    }));
    return enriched;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const results = await fetchRecommendations(mood, time, platform, type);
    const enrichedResults = await enrichWithPlatform(results);
    setRecommendations(enrichedResults);
    setLoading(false);
  };

  const handleRandom = async () => {
    setLoading(true);
    const results = await fetchRecommendations("Chill", "1 hour", "", "tv");
    const enrichedResults = await enrichWithPlatform(results);
    setRecommendations(enrichedResults);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎬 WatchPickr</h1>

      <div className="grid gap-4">
        <select className="p-2 border rounded" onChange={e => setMood(e.target.value)} value={mood}>
          <option value="">Select Mood</option>
          {moods.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select className="p-2 border rounded" onChange={e => setTime(e.target.value)} value={time}>
          <option value="">Select Time</option>
          {times.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select className="p-2 border rounded" onChange={e => setPlatform(e.target.value)} value={platform}>
          <option value="">Select Platform</option>
          {platforms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select className="p-2 border rounded" onChange={e => setType(e.target.value)} value={type}>
          <option value="">Select Type</option>
          {types.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={loading}>Find Me Something</button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded" onClick={handleRandom} disabled={loading}>Just Pick for Me 🎲</button>
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-500 mt-4">Loading recommendations...</div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="space-y-4 mt-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-pink-200">
              <div className="p-4 bg-pink-50">
                <h2 className="font-semibold text-lg flex items-center gap-2">🎬 {rec.title}</h2>
                <p className="text-sm text-gray-600 italic">{rec.reason}</p>
                <p className="text-xs mt-2 text-pink-700">Available on: {rec.platform || 'Unknown'}</p>
                {rec.links && rec.links.length > 0 && (
                  <ul className="text-xs mt-1 space-y-1">
                    {rec.links.map((link, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {providerLogos[link.provider] && (
                          <img src={providerLogos[link.provider]} alt={link.provider} className="h-4 w-auto" />
                        )}
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Watch on {link.provider}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <div className="text-center text-gray-400 mt-6 text-sm">No recommendations yet. Try selecting some options!</div>
      )}
    </div>
  );
} 
