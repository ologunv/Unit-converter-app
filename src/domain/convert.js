// Pure conversion logic. No React, no DOM, no browser storage.
// Keeping this module free of UI code is what makes it easy to test.

import { categories } from './units.js'

export class ConversionError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'ConversionError'
    this.code = code
  }
}

export function getUnit(categoryKey, unitKey) {
  const category = categories[categoryKey]
  if (!category) {
    throw new ConversionError('UNKNOWN_CATEGORY', `Unknown category: ${categoryKey}`)
  }
  const unit = category.units[unitKey]
  if (!unit) {
    throw new ConversionError('UNKNOWN_UNIT', `Unknown unit "${unitKey}" in ${categoryKey}`)
  }
  return unit
}

function toBase(unit, value) {
  return unit.toBase ? unit.toBase(value) : value * unit.factor
}

function fromBase(unit, value) {
  return unit.fromBase ? unit.fromBase(value) : value / unit.factor
}

// Converts a number from one unit to another within the same category.
export function convert(categoryKey, fromKey, toKey, value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new ConversionError('INVALID_VALUE', 'Value must be a finite number')
  }
  const from = getUnit(categoryKey, fromKey)
  const to = getUnit(categoryKey, toKey)
  if (fromKey === toKey) return value
  return fromBase(to, toBase(from, value))
}

// Turns what the user typed into a number, or null when it is not a number yet.
// Accepts a comma as the decimal separator (e.g. "2,5").
export function parseInput(text) {
  if (typeof text !== 'string') return null
  const cleaned = text.trim().replace(',', '.')
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null
  if (!/^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(cleaned)) return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

// Formats a result for display: up to 6 significant digits, no trailing zeros.
export function formatResult(value) {
  if (!Number.isFinite(value)) return ''
  if (value === 0) return '0'
  const abs = Math.abs(value)
  if (abs >= 1e9 || abs < 1e-6) return value.toExponential(4)
  return String(Number(value.toPrecision(6)))
}

// Convenience used by the UI: text in, display text out, plus an error message.
export function convertText(categoryKey, fromKey, toKey, text) {
  const value = parseInput(text)
  if (text.trim() === '') return { output: '', error: null }
  if (value === null) return { output: '', error: 'Please enter a number.' }
  return { output: formatResult(convert(categoryKey, fromKey, toKey, value)), error: null }
}
