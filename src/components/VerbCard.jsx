import { BadgeCheck } from "lucide-react";

export default function VerbCard({ item, onSave, isSaved }) {
  return (
    <div className="group rounded-xl border bg-white/70 backdrop-blur p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {item.verb}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{item.meaning}</p>
        </div>
        {isSaved ? (
          <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <BadgeCheck size={16} /> Saved
          </div>
        ) : (
          <button
            onClick={() => onSave(item)}
            className="text-xs font-medium rounded-lg px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          >
            Save
          </button>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Example:</span> {item.example}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.particles.map((p) => (
          <span key={p} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {p}
          </span>
        ))}
        {item.tags?.map((t) => (
          <span key={t} className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
