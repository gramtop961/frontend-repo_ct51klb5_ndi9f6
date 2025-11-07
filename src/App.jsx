import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import VerbList from "./components/VerbList";
import Quiz from "./components/Quiz";
import { PHRASAL_VERBS } from "./components/data";

function App() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem("saved_verbs");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const onSave = (item) => {
    if (saved.find((s) => s.verb === item.verb)) return;
    const next = [...saved, item];
    setSaved(next);
    localStorage.setItem("saved_verbs", JSON.stringify(next));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHRASAL_VERBS.filter((v) => {
      const matchesQuery =
        !q ||
        v.verb.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        v.example.toLowerCase().includes(q);
      const matchesTag = tag === "all" || v.tags?.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Header />
        <SearchBar onSearch={setQuery} onFilterChange={setTag} activeTag={tag} />

        <section className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Browse</h2>
              <div className="text-sm text-gray-500">{filtered.length} results</div>
            </div>
            <VerbList items={filtered} onSave={onSave} saved={saved} />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Saved</h3>
              {saved.length ? (
                <ul className="mt-3 space-y-2">
                  {saved.map((s) => (
                    <li key={s.verb} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      <div>
                        <div className="font-medium">{s.verb}</div>
                        <div className="text-gray-500">{s.meaning}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-2">No saved items yet. Click “Save” to build your list.</p>
              )}
            </div>

            <Quiz items={PHRASAL_VERBS} />
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500 pt-4">
          Built for focused English phrasal verb practice.
        </footer>
      </div>
    </div>
  );
}

export default App;
