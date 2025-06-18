// src/App.js
import React from "react";
import SearchForm from "./SearchForm"; // Ensure this path is correct

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="p-6 bg-white shadow text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
          🎬 WatchPickr
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Find what to watch based on your mood, time, platform, and country
        </p>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <SearchForm />
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        &copy; {new Date().getFullYear()} WatchPickr. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
