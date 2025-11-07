import { useEffect, useMemo, useRef, useState } from "react";
import { Shuffle, CheckCircle2, RotateCcw } from "lucide-react";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz({ items }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);

  const verbs = useMemo(() => shuffle(items).slice(0, 8), [items]);
  const current = verbs[index];

  useEffect(() => {
    if (!current) return;
    const wrong = shuffle(items.filter((v) => v.verb !== current.verb))
      .slice(0, 3)
      .map((v) => v.verb);
    const options = shuffle([current.verb, ...wrong]);
    setChoices(options);
    setSelected(null);
  }, [index, current, items]);

  const onPick = (v) => {
    if (selected) return;
    setSelected(v);
    if (v === current.verb) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= verbs.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setDone(false);
  };

  if (!verbs.length) return null;

  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Quick Quiz</h3>
        <button onClick={restart} className="inline-flex items-center gap-1 text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      {done ? (
        <div className="mt-4 text-center">
          <p className="text-gray-700">You scored</p>
          <p className="text-3xl font-bold text-gray-900">{score} / {verbs.length}</p>
          <p className="text-sm text-gray-500 mt-1">Keep practicing to improve!</p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Choose the correct phrasal verb for:</p>
            <p className="text-lg font-medium text-gray-900">“{current.meaning}”</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {choices.map((c) => {
              const correct = selected && c === current.verb;
              const wrong = selected && c !== current.verb && c === selected;
              return (
                <button
                  key={c}
                  onClick={() => onPick(c)}
                  className={`rounded-lg border px-3 py-2 text-sm text-left transition ${
                    correct
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : wrong
                      ? "border-rose-400 bg-rose-50 text-rose-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Question {index + 1} of {verbs.length}</div>
            <button
              onClick={next}
              disabled={!selected}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 disabled:bg-gray-300 text-white text-sm px-3 py-2"
            >
              <Shuffle size={16} /> Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
