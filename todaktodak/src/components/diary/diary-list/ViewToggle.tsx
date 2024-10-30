interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onViewChange("grid")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          view === "grid"
            ? "text-white bg-indigo-600 hover:bg-indigo-700"
            : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
        }`}
      >
        격자뷰
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          view === "list"
            ? "text-white bg-indigo-600 hover:bg-indigo-700"
            : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
        }`}
      >
        목록뷰
      </button>
    </div>
  );
}
