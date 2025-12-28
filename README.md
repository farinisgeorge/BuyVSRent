# Buy vs. Rent Calculator 🏠💰

A high-performance, fully interactive **Buy vs. Rent Calculator** designed for the European market. Analyze the financial impact of buying a home versus renting and investing in the S&P 500 over 30 years.

## Features

✨ **Interactive Dashboard**
- Real-time calculations as you adjust sliders
- Two-column responsive layout (left: controls, right: visualization)
- Smooth animations and professional design

📊 **Advanced Calculations**
- Accurate mortgage amortization calculations
- Home appreciation projections
- S&P 500 investment growth simulation
- Break-even year detection

🌍 **European Market Support**
- Pre-configured defaults for European markets
- Support for 6 countries: Germany, France, Netherlands, Spain, Italy, Belgium
- Currency formatting in EUR

📱 **Fully Responsive**
- Mobile-optimized sliders
- Adaptive grid layout
- Touch-friendly controls

## Technology Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Sliders)
- **Charts**: Recharts (AreaChart)
- **Icons**: Lucide React

## Project Structure

```
buyvsrent/
├── app/
│   ├── layout.tsx          # Root layout with Tailwind config
│   ├── page.tsx            # Main calculator page (complete UI)
│   └── globals.css         # Global styles
├── hooks/
│   └── useBuyVsRent.ts     # Core calculation logic hook
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ (with npm or yarn)
- macOS, Windows, or Linux

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## How It Works

### Core Logic: `useBuyVsRent` Hook

The hook implements the complete financial analysis:

**Buying Scenario:**
1. Initial Cost = (Price × Down Payment %) + (Price × Closing Costs %)
2. Monthly Cost = Mortgage Payment + Maintenance + Property Tax
3. Future Value = Appreciated Home Value - Remaining Mortgage Balance

**Renting & S&P 500 Scenario:**
1. Initial Investment = Down Payment + Closing Costs (same amount as buyer)
2. Monthly Contribution = max(0, Buyer Monthly Cost - Monthly Rent)
3. Portfolio Growth = Initial Investment and Monthly Contributions compounded annually at the 'Stock Market Return %'

**Break-Even Analysis:**
- Determines the year where buying net worth exceeds renting net worth
- Generates 30-year comparison data for visualization

### Default European Parameters

| Parameter | Default | Range |
|-----------|---------|-------|
| Closing Costs | 10% | 0-15% |
| Maintenance | 1% annually | 0.5-3% |
| Property Tax | 0.2% annually | 0-1.5% |
| S&P 500 Return | 7% annually | 3-12% |
| Home Appreciation | 3% annually | 0-6% |

## Interactive Sliders

### Property Information
- **Home Price**: €100,000 - €1,000,000
- **Down Payment**: 5% - 50%
- **Annual Home Appreciation**: 0% - 6%
- **Maintenance Cost**: 0.5% - 3%
- **Property Tax**: 0% - 1.5%

### Mortgage Details
- **Interest Rate**: 1% - 10%
- **Mortgage Term**: 5 - 40 years
- **Closing Costs**: 0% - 15%

### Renting & Investment
- **Monthly Rent**: €500 - €5,000
- **S&P 500 Annual Return**: 3% - 12%

## Visualization

The AreaChart displays:
- **Blue Area**: Net Worth if Buying (home value - mortgage balance)
- **Gray Area**: Net Worth if Renting & Investing (investment portfolio)
- **X-Axis**: Years (0-30)
- **Y-Axis**: Net Worth (€)
- **Interactive Tooltip**: Hover to see exact values

## Verdict Card

Automatically generates:
- **Decision**: "Buying Wins" or "Renting & Investing Wins"
- **Break-Even Year**: When buying becomes more profitable
- **30-Year Comparison**: Final net worth for both scenarios
- **Financial Difference**: How much more/less you have with each option

## Calculations Details

### Mortgage Calculation
Uses the standard amortization formula:
```
M = P × [r(1+r)^n] / [(1+r)^n - 1]
```
Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (annual / 12)
- n = Number of payments (years × 12)

### Remaining Balance After N Months
```
B = P(1+r)^n - M[(1+r)^n - 1] / r
```

### Investment Growth (Annual Compounding)
```
Portfolio = Previous Year × (1 + Annual Return %) + Annual Contributions
```

## Responsiveness

- **Desktop (lg)**: Two-column grid (left controls, right visualization)
- **Tablet (md)**: Two-column grid with adjusted spacing
- **Mobile (sm)**: Single-column stacked layout
- **All Sizes**: Touch-optimized sliders and buttons

## Customization

### Change Default Values
Edit `app/page.tsx` line ~95-104:
```typescript
const [homePrice, setHomePrice] = useState(400000); // Change default price
const [monthlyRent, setMonthlyRent] = useState(1500); // Change default rent
```

### Adjust Slider Ranges
Edit `SliderField` calls to modify min/max:
```typescript
<SliderField
  label="Home Price"
  value={homePrice}
  onChange={setHomePrice}
  min={50000}    // Change minimum
  max={2000000}  // Change maximum
  step={5000}    // Change step size
  suffix="€"
/>
```

### Add More Countries
Edit `COUNTRIES` array in `app/page.tsx`:
```typescript
const COUNTRIES = [
  { name: 'Portugal', label: 'Portugal' },
  { name: 'Greece', label: 'Greece' },
  // ... add more
];
```

## Performance

- ✅ Real-time calculations with React `useMemo` optimization
- ✅ Responsive Recharts AreaChart with smooth rendering
- ✅ Optimized bundle size with tree-shaking
- ✅ Static pre-rendering for fast initial load
- ✅ ISR (Incremental Static Regeneration) ready

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## API & Hooks

### `useBuyVsRent(input: BuyVsRentInput): BuyVsRentResult`

**Input:**
```typescript
interface BuyVsRentInput {
  homePrice: number;
  downPaymentPercent: number;
  closingCostsPercent: number;
  annualMaintenancePercent: number;
  annualPropertyTaxPercent: number;
  monthlyRent: number;
  annualHomeAppreciationPercent: number;
  mortgageRatePercent: number;
  mortgageYears: number;
  annualStockReturnPercent: number;
}
```

**Output:**
```typescript
interface BuyVsRentResult {
  yearlyData: YearlyData[];      // 30 years of data
  breakEvenYear: number | null;   // Year when buying wins
  buyingWins: boolean;            // Final verdict
  totalBuyingNetWorth: number;    // Final wealth (buying)
  totalRentingNetWorth: number;   // Final wealth (renting)
  difference: number;             // Difference in EUR
}
```

## Development

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t buyvsrent .
docker run -p 3000:3000 buyvsrent
```

---

**Made with ❤️ for European homebuyers and investors**
