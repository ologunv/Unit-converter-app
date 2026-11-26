export default function History({ items, onClear }) {
  return (
    <section className="card history" aria-label="Conversion history">
      <div className="history-head">
        <h2>History</h2>
        {items.length > 0 && (
          <button type="button" className="link" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="muted">No saved conversions yet.</p>
      ) : (
        <ol>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )}
    </section>
  )
}
