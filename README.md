## Buy vs. Rent Calculator 🏠💰

A compact, interactive tool to compare buying a home versus renting and investing over multi-decade horizons, focused on European markets.

Highlights
 - Fast, slide-driven UI with real-time feedback
 - 30-year year-by-year simulation for buying vs. renting + investing
 - Country-specific market defaults (Netherlands is the current default)

Technology
 - Next.js (App Router, TypeScript) — development often uses Turbopack
 - Tailwind CSS for styling
 - Recharts for charts, Radix UI for sliders, Lucide icons

Quickstart
```bash
# install
npm install

# development
npm run dev

# production build
npm run build
npm start
```

Project layout (key files)
```
app/                      # Next.js app router pages and UI
  calculator-content.tsx   # Calculator UI and "Generate report" flow
  report/                  # Report page and rehydration logic
src/
  components/
    Header.tsx            # Top nav (Sign In removed by default)
  contexts/
    AuthContext.tsx       # Supabase init; errors are handled gracefully
hooks/
  useBuyVsRent.ts         # Core financial simulation
src/lib/constants.ts      # Market defaults (country data)
```

Defaults & behavior
- Default country: Netherlands (NL) for calculator and report flows.
- Generating the detailed report is available without signing in — the UI no longer prompts for email on report generation.
- Supabase is included for optional persistence, but initialization now tolerates missing/invalid refresh tokens (no crash).

Inputs and core logic
- The `useBuyVsRent` hook drives the calculations (mortgage amortization, home appreciation, portfolio growth).
- Key input fields: `homePrice`, `downPaymentPercent`, `mortgageRatePercent`, `mortgageYears`, `monthlyRent`, `annualStockReturnPercent`, `annualHomeAppreciationPercent`, `annualMaintenancePercent`, `annualPropertyTaxPercent`, `closingCostsPercent`.

Change defaults
- Market defaults: `src/lib/constants.ts`
- Calculator UI defaults: `app/calculator-content.tsx`
- Report URL / rehydration: `app/report/report-content.tsx`

Development notes
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm test`

Deployment
- Vercel recommended. Example:
```bash
npm install -g vercel
vercel
```

Docker
```bash
docker build -t buyvsrent .
docker run -p 3000:3000 buyvsrent
```

Notes about recent edits
- The header Sign In button was removed from the default UI; authentication-related UI and gating for generating reports were simplified to allow unauthenticated report generation.
- `src/contexts/AuthContext.tsx` now catches errors from Supabase session initialization to avoid runtime crashes when tokens are invalid/missing.
- `src/components/DetailedReport.tsx` and report UI were made more defensive to avoid runtime undefined errors when yearly simulation data is incomplete.

Contributing
- Follow the repository lint/type rules. Small feature branches and PRs are welcome.

License
- Open-source (choose a license in your repo if desired).

Made with ❤️ for European homebuyers and investors

## Features

- Interactive sliders and instant recalculation
- Year-by-year breakdown (30 years) with charts and table views
- Break-even detection and final net-worth comparison
- Country presets for common European markets (quick start)
- Exportable report snapshot (JSON) — optional when Supabase is configured

## Interpreting the Report

- Buying Net Worth: estimated home value minus remaining mortgage balance plus any invested surplus.
- Renting Net Worth: starting investment (equivalent to the buyer's initial outlay) compounded with monthly contributions (savings from renting) at the chosen stock return.
- Break-even Year: the earliest year where Buying Net Worth >= Renting Net Worth. If null, renting remains ahead for the simulation horizon.
- Sensitivity: small changes in mortgage rate, home appreciation, or stock return can materially change the result — treat the output as scenario guidance not financial advice.

## Example Workflow

1. Open the calculator (`npm run dev`) and pick a country preset.
2. Set `Home Price`, `Down Payment`, `Mortgage Rate`, and `Mortgage Term`.
3. Enter your current `Monthly Rent` and expected `S&P 500 Annual Return`.
4. Click "Generate Detailed Report" to view the year-by-year table and download a snapshot.

## Troubleshooting

- Dev server won't start: remove `.next`, ensure no other `next dev` instance is running, then `npm run dev`.
- Charts not rendering: ensure `yearlyData` is non-empty; adjust inputs to valid ranges.
- Supabase auth errors: the app tolerates invalid tokens, but if you rely on persistence, check your `SUPABASE_URL` and `SUPABASE_KEY` environment variables.

## Roadmap

- Add unit tests for `useBuyVsRent` scenarios
- Add CI checks for linting and typechecks
- Add CSV export for report data
- Improve mobile UX for long tables

## Contributing

1. Fork and create a feature branch from `main`.
2. Run `npm install`, implement changes, add tests.
3. Run `npm run lint` and `npm run typecheck`.
4. Open a pull request with a clear description and screenshots if UI changes.

## License

This repository does not include a license by default. For open-source use, consider adding an `MIT` or other permissive license.

## Contact

Open issues or PRs on the repository; for quick questions ping the maintainer in the project board or add a brief issue describing the problem.

