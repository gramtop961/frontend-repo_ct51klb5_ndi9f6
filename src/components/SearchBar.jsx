import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch, onFilterChange, activeTag }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const clear = () => setQuery("");

  const tags = useMemo(
    () => [
      "all",
      "everyday",
      "work",
      "study",
      "travel",
      "people",
      "health",
      "organization",
      "problem-solving",
      "business",
      "school",
      "care",
      "home",
      "time",
      "feelings",
      "future",
      "conversation",
      "relationships",
      "information",
    ],
    []
  );

  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 md:p-6 shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search phrasal verbs or meanings..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none ring-indigo-500/20 focus:ring-4"
        />
        {query && (
          <button
            aria-label="Clear"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => onFilterChange(t)}
            className={`${
              activeTag === t
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } rounded-full px-3 py-1.5 text-xs font-medium transition`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
