// Unit definitions for every category.
// Linear units store a factor: how many base units one of this unit equals.
// Temperature is not linear (it has an offset), so it uses toBase/fromBase functions.

export const categories = {
  length: {
    label: 'Length',
    base: 'm',
    units: {
      mm: { label: 'Millimetre', factor: 0.001 },
      cm: { label: 'Centimetre', factor: 0.01 },
      m: { label: 'Metre', factor: 1 },
      km: { label: 'Kilometre', factor: 1000 },
      in: { label: 'Inch', factor: 0.0254 },
      ft: { label: 'Foot', factor: 0.3048 },
      yd: { label: 'Yard', factor: 0.9144 },
      mi: { label: 'Mile', factor: 1609.344 },
    },
  },
  weight: {
    label: 'Weight',
    base: 'kg',
    units: {
      mg: { label: 'Milligram', factor: 0.000001 },
      g: { label: 'Gram', factor: 0.001 },
      kg: { label: 'Kilogram', factor: 1 },
      t: { label: 'Tonne', factor: 1000 },
      oz: { label: 'Ounce', factor: 0.028349523125 },
      lb: { label: 'Pound', factor: 0.45359237 },
    },
  },
  temperature: {
    label: 'Temperature',
    base: 'C',
    units: {
      C: { label: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
      F: { label: 'Fahrenheit', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      K: { label: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  volume: {
    label: 'Volume',
    base: 'l',
    units: {
      ml: { label: 'Millilitre', factor: 0.001 },
      l: { label: 'Litre', factor: 1 },
      m3: { label: 'Cubic metre', factor: 1000 },
      tsp: { label: 'Teaspoon (US)', factor: 0.00492892159375 },
      tbsp: { label: 'Tablespoon (US)', factor: 0.01478676478125 },
      cup: { label: 'Cup (US)', factor: 0.2365882365 },
      gal: { label: 'Gallon (US)', factor: 3.785411784 },
    },
  },
  time: {
    label: 'Time',
    base: 's',
    units: {
      ms: { label: 'Millisecond', factor: 0.001 },
      s: { label: 'Second', factor: 1 },
      min: { label: 'Minute', factor: 60 },
      h: { label: 'Hour', factor: 3600 },
      d: { label: 'Day', factor: 86400 },
      wk: { label: 'Week', factor: 604800 },
    },
  },
  speed: {
    label: 'Speed',
    base: 'mps',
    units: {
      mps: { label: 'Metres per second', factor: 1 },
      kph: { label: 'Kilometres per hour', factor: 1000 / 3600 },
      mph: { label: 'Miles per hour', factor: 0.44704 },
      kn: { label: 'Knot', factor: 1852 / 3600 },
    },
  },
}

export const categoryKeys = Object.keys(categories)
