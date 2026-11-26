export default function UnitSelect({ label, units, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(units).map(([key, unit]) => (
          <option key={key} value={key}>
            {unit.label} ({key})
          </option>
        ))}
      </select>
    </label>
  )
}
