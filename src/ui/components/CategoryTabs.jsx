export default function CategoryTabs({ keys, categories, active, onChange }) {
  return (
    <nav className="tabs" aria-label="Unit categories">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          className={key === active ? 'tab active' : 'tab'}
          aria-pressed={key === active}
          onClick={() => onChange(key)}
        >
          {categories[key].label}
        </button>
      ))}
    </nav>
  )
}
