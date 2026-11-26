import { useState } from 'react'
import { categories, categoryKeys } from '../domain/units.js'
import { convertText } from '../domain/convert.js'
import { loadHistory, addToHistory, clearHistory } from '../domain/history.js'
import CategoryTabs from './components/CategoryTabs.jsx'
import UnitSelect from './components/UnitSelect.jsx'
import History from './components/History.jsx'

// Two sensible default units for each category: the first two in the list.
function defaultUnits(categoryKey) {
  const keys = Object.keys(categories[categoryKey].units)
  return { from: keys[0], to: keys[1] }
}

const storage = typeof window !== 'undefined' ? window.localStorage : null

export default function App() {
  const [category, setCategory] = useState('length')
  const [from, setFrom] = useState(defaultUnits('length').from)
  const [to, setTo] = useState(defaultUnits('length').to)
  const [input, setInput] = useState('1')
  const [history, setHistory] = useState(() => (storage ? loadHistory(storage) : []))

  // Instant conversion: the result is computed on every render, no button needed.
  const { output, error } = convertText(category, from, to, input)

  function changeCategory(key) {
    const d = defaultUnits(key)
    setCategory(key)
    setFrom(d.from)
    setTo(d.to)
  }

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function save() {
    if (!output || error || !storage) return
    const entry = `${input} ${from} = ${output} ${to}`
    setHistory(addToHistory(storage, entry))
  }

  const units = categories[category].units

  return (
    <main className="app">
      <header>
        <h1>Unit Converter</h1>
        <p className="subtitle">Type a value and the result updates instantly.</p>
      </header>

      <CategoryTabs keys={categoryKeys} categories={categories} active={category} onChange={changeCategory} />

      <section className="card" aria-label={`${categories[category].label} converter`}>
        <div className="row">
          <label className="field">
            <span>Value</span>
            <input
              type="text"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby="input-error"
            />
          </label>
          <UnitSelect label="From" units={units} value={from} onChange={setFrom} />
        </div>

        <button type="button" className="swap" onClick={swap} aria-label="Swap units">
          ⇅ Swap
        </button>

        <div className="row">
          <label className="field">
            <span>Result</span>
            <output className="result" aria-live="polite">
              {output || '–'}
            </output>
          </label>
          <UnitSelect label="To" units={units} value={to} onChange={setTo} />
        </div>

        <p id="input-error" className="error" role="alert">
          {error}
        </p>

        <button type="button" className="primary" onClick={save} disabled={!output || Boolean(error)}>
          Save to history
        </button>
      </section>

      <History items={history} onClear={() => storage && setHistory(clearHistory(storage))} />

      <footer>CMPS 570 Final Project · v{__APP_VERSION__}</footer>
    </main>
  )
}
