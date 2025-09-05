export default function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="!text-sm font-medium color-(--color-text-secondary)">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1 rounded-md border ${
              value === opt.value
                ? '!bg-(--color-primary-100) text-(--color-primary) border-purple-400'
                : 'bg-white !border-(--color-border) text-(--color-text-primary) border-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
