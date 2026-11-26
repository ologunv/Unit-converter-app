# ADR 0001: Keep conversion logic in a separate domain module

**Status:** Accepted
**Date:** 2026-11-26

## Context

The main quality attribute of this project is **testability**. The target is 80%+ automated test coverage of the conversion logic. If conversion math lives inside React components, every test has to render the UI, which makes tests slower, harder to write and more fragile.

## Options considered

1. **Logic inside React components.** Fewest files, but tests need a DOM and component rendering, and the math is mixed with display code.
2. **Logic in custom React hooks.** Better separation, but hooks still need a React test renderer.
3. **Logic in plain JavaScript modules (`src/domain`) with no React or browser imports.** The UI calls these functions.

## Decision

Option 3. `src/domain/convert.js` and `src/domain/units.js` contain only pure functions and data. The UI layer (`src/ui`) imports them, never the other way round.

## Consequences

- Tests call functions directly with inputs and check outputs: no DOM, no mocks, 51 tests run in under a second.
- Coverage is measured on `src/domain`, which reached 100% lines and branches.
- The UI layer is thin and is checked manually and in the demo rather than by unit tests. This is an accepted trade-off.
- The same module could be reused in another front end (for example a CLI) without changes.
