import { describe, it, expect } from 'vitest'
import { loadHistory, addToHistory, clearHistory } from '../history.js'

// A fake storage object: this is why history.js takes storage as a parameter.
function fakeStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v
    },
    removeItem: (k) => {
      delete data[k]
    },
  }
}

const brokenStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('full')
  },
  removeItem: () => {
    throw new Error('blocked')
  },
}

describe('history', () => {
  it('starts empty', () => {
    expect(loadHistory(fakeStorage())).toEqual([])
  })
  it('adds newest entries first', () => {
    const s = fakeStorage()
    addToHistory(s, 'a')
    addToHistory(s, 'b')
    expect(loadHistory(s)).toEqual(['b', 'a'])
  })
  it('keeps at most 10 entries', () => {
    const s = fakeStorage()
    for (let i = 0; i < 15; i++) addToHistory(s, i)
    const list = loadHistory(s)
    expect(list).toHaveLength(10)
    expect(list[0]).toBe(14)
  })
  it('clears history', () => {
    const s = fakeStorage()
    addToHistory(s, 'a')
    expect(clearHistory(s)).toEqual([])
    expect(loadHistory(s)).toEqual([])
  })
  it('ignores corrupted or non-array data', () => {
    expect(loadHistory(fakeStorage({ 'unit-converter:history': '{bad json' }))).toEqual([])
    expect(loadHistory(fakeStorage({ 'unit-converter:history': '{"a":1}' }))).toEqual([])
  })
  it('does not crash when storage is blocked or full', () => {
    expect(loadHistory(brokenStorage)).toEqual([])
    expect(addToHistory(brokenStorage, 'x')).toEqual(['x'])
    expect(clearHistory(brokenStorage)).toEqual([])
  })
})
