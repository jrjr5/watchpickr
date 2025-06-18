// src/SearchResults.js
import React from "react";

function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return <p className="text-center mt-6 text-gray-500">No results found.</p>;
  }

  return (
    <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((item) => (
        <div key={item.id} className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-2">{item.title || item.name}</h3>
          {item.overview && (
            <p className="text-sm text-gray-700 mb-2 line-clamp-4">{item.overview}</p>
          )}
          {item.trailerUrl ? (
            <a
              href={item.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              🎬 Watch Trailer
            </a>
          ) : (
            <p className="text-gray-400 text-xs">No trailer available</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
