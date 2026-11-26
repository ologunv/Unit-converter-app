import { describe, it, expect } from 'vitest'
import { convert, convertText, formatResult, getUnit, parseInput, ConversionError } from '../convert.js'
import { categories, categoryKeys } from '../units.js'

describe('convert: length', () => {
  it('converts kilometres to metres', () => {
    expect(convert('length', 'km', 'm', 1)).toBe(1000)
  })
  it('converts miles to kilometres', () => {
    expect(convert('length', 'mi', 'km', 1)).toBeCloseTo(1.609344, 6)
  })
  it('converts feet to inches', () => {
    expect(convert('length', 'ft', 'in', 1)).toBeCloseTo(12, 9)
  })
})

describe('convert: weight', () => {
  it('converts pounds to kilograms', () => {
    expect(convert('weight', 'lb', 'kg', 1)).toBeCloseTo(0.45359237, 9)
  })
  it('converts kilograms to ounces', () => {
    expect(convert('weight', 'kg', 'oz', 1)).toBeCloseTo(35.274, 3)
  })
})

describe('convert: temperature', () => {
  it('converts 0 °C to 32 °F', () => {
    expect(convert('temperature', 'C', 'F', 0)).toBeCloseTo(32, 9)
  })
  it('converts 212 °F to 100 °C', () => {
    expect(convert('temperature', 'F', 'C', 212)).toBeCloseTo(100, 9)
  })
  it('converts 0 K to -273.15 °C', () => {
    expect(convert('temperature', 'K', 'C', 0)).toBeCloseTo(-273.15, 9)
  })
  it('converts -40 °F to -40 °C', () => {
    expect(convert('temperature', 'F', 'C', -40)).toBeCloseTo(-40, 9)
  })
  it('converts °F to K', () => {
    expect(convert('temperature', 'F', 'K', 32)).toBeCloseTo(273.15, 9)
  })
})

describe('convert: volume, time and speed', () => {
  it('converts US gallons to litres', () => {
    expect(convert('volume', 'gal', 'l', 1)).toBeCloseTo(3.785411784, 9)
  })
  it('converts hours to minutes', () => {
    expect(convert('time', 'h', 'min', 2)).toBe(120)
  })
  it('converts km/h to m/s', () => {
    expect(convert('speed', 'kph', 'mps', 36)).toBeCloseTo(10, 9)
  })
})

describe('convert: general rules', () => {
  it('returns the same value when from and to are the same unit', () => {
    expect(convert('length', 'm', 'm', 5)).toBe(5)
  })
  it('round-trips every unit in every category back to the original value', () => {
    for (const key of categoryKeys) {
      const units = Object.keys(categories[key].units)
      for (const from of units) {
        for (const to of units) {
          const there = convert(key, from, to, 42)
          expect(convert(key, to, from, there)).toBeCloseTo(42, 6)
        }
      }
    }
  })
  it('handles negative numbers', () => {
    expect(convert('length', 'm', 'cm', -2)).toBe(-200)
  })
  it('throws on an unknown category', () => {
    expect(() => convert('colour', 'a', 'b', 1)).toThrow(ConversionError)
  })
  it('throws on an unknown unit with code UNKNOWN_UNIT', () => {
    try {
      convert('length', 'm', 'parsec', 1)
    } catch (e) {
      expect(e.code).toBe('UNKNOWN_UNIT')
    }
    expect.assertions(1)
  })
  it('throws on a value that is not a finite number', () => {
    expect(() => convert('length', 'm', 'km', NaN)).toThrow(/finite number/)
    expect(() => convert('length', 'm', 'km', '5')).toThrow(ConversionError)
  })
  it('getUnit returns the unit definition', () => {
    expect(getUnit('time', 'h').factor).toBe(3600)
  })
})

describe('parseInput', () => {
  it.each([
    ['12', 12],
    ['  3.5 ', 3.5],
    ['2,5', 2.5],
    ['-7', -7],
    ['.5', 0.5],
    ['4.', 4],
    ['1e3', 1000],
  ])('parses %j as %d', (text, expected) => {
    expect(parseInput(text)).toBe(expected)
  })
  it.each(['', '   ', '-', '.', 'abc', '1.2.3', '0x10', 'Infinity', '12kg'])('returns null for %j', (text) => {
    expect(parseInput(text)).toBeNull()
  })
  it('returns null when the input is not a string', () => {
    expect(parseInput(42)).toBeNull()
  })
  it('returns null when the number overflows', () => {
    expect(parseInput('1e999')).toBeNull()
  })
})

describe('formatResult', () => {
  it('shows zero as 0', () => expect(formatResult(0)).toBe('0'))
  it('keeps 6 significant digits and drops trailing zeros', () => {
    expect(formatResult(1.609344)).toBe('1.60934')
    expect(formatResult(1000)).toBe('1000')
  })
  it('uses exponent form for very large and very small numbers', () => {
    expect(formatResult(1e12)).toBe('1.0000e+12')
    expect(formatResult(1e-9)).toBe('1.0000e-9')
  })
  it('returns an empty string for NaN or Infinity', () => {
    expect(formatResult(NaN)).toBe('')
    expect(formatResult(Infinity)).toBe('')
  })
})

describe('convertText (used by the UI)', () => {
  it('returns empty output and no error for empty input', () => {
    expect(convertText('length', 'm', 'km', '')).toEqual({ output: '', error: null })
  })
  it('returns an error message for text that is not a number', () => {
    expect(convertText('length', 'm', 'km', 'abc').error).toBe('Please enter a number.')
  })
  it('returns formatted output for valid input', () => {
    expect(convertText('length', 'm', 'km', '1500')).toEqual({ output: '1.5', error: null })
  })
})
