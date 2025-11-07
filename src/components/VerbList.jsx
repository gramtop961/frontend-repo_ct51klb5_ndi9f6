import VerbCard from "./VerbCard";

export default function VerbList({ items, onSave, saved }) {
  if (!items.length)
    return (
      <div className="text-center text-sm text-gray-500 py-6">No results. Try a different search or tag.</div>
    );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <VerbCard
          key={item.verb}
          item={item}
          onSave={onSave}
          isSaved={!!saved.find((s) => s.verb === item.verb)}
        />
      ))}
    </div>
  );
}
