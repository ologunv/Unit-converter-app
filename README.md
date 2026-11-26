# Unit Converter with Test Suite

CMPS 570 Software Architecture, Final Project (Project 10).
Main quality attribute: **Testability**.

**Live app:** https://ologunv.github.io/Unit-converter-app/

## What the app does

- Converts between units in 6 categories: length, weight, temperature, volume, time and speed.
- Converts instantly while you type, with no button to press.
- Swaps units with one click and shows a clear message when the input is not a number.
- Saves recent conversions to a history list in the browser (stretch goal).
- Works on desktop and phone.

## Architecture in one paragraph

The app is a small single-page React application with two layers. The **domain layer** (`src/domain`) holds the unit data and all conversion logic as plain JavaScript functions with no React or browser dependencies. The **UI layer** (`src/ui`) is made of React components that only read input, call the domain functions and display results. Every conversion goes through a base unit for its category, so one generic `convert()` function serves all categories. Because the domain layer is pure, it is covered by fast automated tests (Vitest), and a GitHub Actions pipeline runs those tests with an 80% coverage threshold before every deployment to GitHub Pages. Decisions are recorded in [`docs/adr`](docs/adr).

## Project structure

```
src/
  domain/            conversion logic (pure functions, fully tested)
    units.js         unit definitions per category
    convert.js       convert, parseInput, formatResult
    history.js       conversion history, storage passed in
    __tests__/       Vitest unit tests
  ui/                React components (presentation only)
    App.jsx
    components/
docs/adr/            Architecture Decision Records
docs/diagrams/       context, component and deployment views (SVG + PNG)
docs/report/         architecture report (Markdown + PDF)
.github/workflows/   test and deploy pipeline
```

## How to run it

```bash
npm install
npm run dev        # start the app at http://localhost:5173
npm test           # run the test suite
npm run coverage   # run tests with a coverage report (HTML in coverage/)
npm run build      # production build in dist/
```

## Test results

51 tests, 100% statement, branch, function and line coverage on the domain layer (threshold 80%).

## Documentation

- [Architecture report (PDF, 7 pages)](docs/report/architecture-report.pdf), with the source in [Markdown](docs/report/architecture-report.md)
- Architecture views: [context](docs/diagrams/context-view.png), [component](docs/diagrams/component-view.png), [deployment](docs/diagrams/deployment-view.png)
- Architecture Decision Records: [`docs/adr`](docs/adr)

## Tools and AI assistants used

- Vite, React, Vitest and @vitest/coverage-v8
- GitHub Actions and GitHub Pages
- Claude (Anthropic) was used as an AI assistant to help scaffold the project, write code and tests, and draft documentation. All code was reviewed and can be explained by the author.
