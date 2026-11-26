// Conversion history (stretch goal). The storage object is passed in,
// so tests can use a fake instead of the real browser localStorage.

const KEY = 'unit-converter:history'
const MAX = 10

export function loadHistory(storage) {
  try {
    const raw = storage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function addToHistory(storage, entry) {
  const list = [entry, ...loadHistory(storage)].slice(0, MAX)
  try {
    storage.setItem(KEY, JSON.stringify(list))
  } catch {
    // Storage can be full or blocked; history is optional, so ignore it.
  }
  return list
}

export function clearHistory(storage) {
  try {
    storage.removeItem(KEY)
  } catch {
    // ignore
  }
  return []
}
