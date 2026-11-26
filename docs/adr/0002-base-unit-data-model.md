# ADR 0002: Convert through a base unit using a data table

**Status:** Accepted
**Date:** 2026-11-26

## Context

The app must support at least 5 categories, each with several units. Writing a separate formula for every pair of units grows quickly (n × n functions per category) and every formula would need its own test.

## Options considered

1. **One function per unit pair** (for example `kmToMiles`). Simple to read, but 8 length units alone would need 56 functions.
2. **Base-unit table.** Each unit stores a factor relative to one base unit (metre, kilogram, litre and so on). Conversion is `value × fromFactor ÷ toFactor`.
3. **A third-party library** such as convert-units. Less code, but less control and an extra dependency to explain.

## Decision

Option 2, with one exception: temperature has an offset, so its units store `toBase` and `fromBase` functions instead of a factor.

## Consequences

- One generic `convert()` function serves every category, so a single round-trip test can check every unit pair in every category automatically.
- Adding a unit is a one-line data change with no new logic, which also supports modifiability.
- Floating-point results can show tiny rounding errors, so results are formatted to 6 significant digits and tests use `toBeCloseTo`.
