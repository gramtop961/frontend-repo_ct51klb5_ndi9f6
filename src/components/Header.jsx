import { BookOpen, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl border bg-white/70 backdrop-blur p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow">
          <BookOpen size={24} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            Phrasal Verbs Studio
            <Sparkles className="text-yellow-500" size={20} />
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-600">
            Search, learn, and quiz yourself on common English phrasal verbs.
          </p>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-200/50 blur-3xl" />
    </header>
  );
}
