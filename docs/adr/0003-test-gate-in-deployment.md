# ADR 0003: Vitest with a coverage threshold that blocks deployment

**Status:** Accepted
**Date:** 2026-11-26

## Context

Testability is only useful if tests actually run. The app is deployed to GitHub Pages, and nothing should go live with broken conversion logic.

## Options considered

1. **Jest.** Widely used, but needs extra configuration for Vite and ES modules.
2. **Vitest.** Uses the same configuration as Vite, runs ES modules natively and has built-in V8 coverage.
3. **Run tests only by hand before each push.** No setup, but easy to forget.

## Decision

Use Vitest with `@vitest/coverage-v8`, and set an 80% threshold for lines, branches, functions and statements in `vite.config.js`. The GitHub Actions workflow runs `npm run coverage` before `npm run build`, so a failing test or low coverage stops the deployment.

## Consequences

- Every push to `main` is tested automatically, and the coverage report is the measured evidence for the main quality attribute.
- A deliberate mistake in a conversion factor fails the pipeline, which can be shown in the demo.
- Builds take slightly longer because tests run first (well under a minute).
- The `history.js` module takes its storage object as a parameter, so it can be tested with a fake storage object instead of the real `localStorage`.
