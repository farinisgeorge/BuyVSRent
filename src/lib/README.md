# Library Documentation

Utility functions and constants for the Stealth Investor calculator.

## Constants

**Location**: `src/lib/constants.ts`

### MARKET_DEFAULTS
Country-specific default values for property costs.

```typescript
export const MARKET_DEFAULTS = {
  // Each country has:
  // - name: Display name
  // - buyingCosts: Closing costs as % of purchase price
  // - propertyTax: Annual property tax as % of value
  // - sellingCosts: Selling/agent costs as % of sale price
  
  DE: { name: 'Germany', buyingCosts: 11.5, propertyTax: 0.21, sellingCosts: 3.5 },
  US: { name: 'USA (National Avg)', buyingCosts: 3.0, propertyTax: 1.1, sellingCosts: 6.0 },
  // ... 23 more countries
}
```

**Usage**:
```typescript
import { MARKET_DEFAULTS } from '@/src/lib/constants';

const germany = MARKET_DEFAULTS.DE;
console.log(germany.buyingCosts); // 11.5
```

---

### STEP_INFO
Configuration for the multi-step wizard.

```typescript
export const STEP_INFO = [
  {
    number: 1,
    title: 'Property Details',
    description: 'Set home price and market country',
  },
  // ... Step 2 and 3
];
```

---

### DEFAULT_INPUTS
Initial values for all calculator inputs.

```typescript
export const DEFAULT_INPUTS = {
  homePrice: 400000,
  durationYears: 10,
  homeAppreciationAnnual: 3,
  downPaymentPercent: 20,
  mortgageRatePercent: 3.5,
  mortgagePeriodYears: 25,
  closingCostsPercent: 11.5,
  renovationCost: 25000,
  hoaMonthlyFee: 200,
  maintenanceAnnualPercent: 1,
  sellingCostsPercent: 3.5,
  mortgageInterestDeductionPercent: 0,
  monthlyRent: 1500,
  rentGrowthAnnualPercent: 2,
  investmentReturnAnnual: 7,
};
```

---

### SLIDER_CONFIG
Configuration for slider ranges and step sizes.

```typescript
export const SLIDER_CONFIG = {
  homePrice: { min: 50000, max: 10000000, step: 10000 },
  durationYears: { min: 1, max: 50, step: 1 },
  homeAppreciation: { min: -5, max: 10, step: 0.5 },
  // ... more configs
};
```

---

## Formatting Functions

**Location**: `src/lib/formatting.ts`

### formatCurrency(value, currency?)
Format a number as currency.

```typescript
import { formatCurrency } from '@/src/lib/formatting';

formatCurrency(400000); // "400.000 €"
formatCurrency(1234.56); // "1.235 €"
formatCurrency(100, 'USD'); // "100 $"
```

**Parameters**:
- `value` (number): The amount to format
- `currency` (string, default: 'EUR'): Currency code

**Returns**: Formatted currency string with locale-specific grouping

---

### formatPercentage(value, decimals?)
Format a decimal as percentage.

```typescript
import { formatPercentage } from '@/src/lib/formatting';

formatPercentage(0.35); // "35.0%"
formatPercentage(3.5, 0); // "350%"
formatPercentage(0.0325, 2); // "3.25%"
```

**Parameters**:
- `value` (number): Decimal value to format
- `decimals` (number, default: 1): Number of decimal places

**Returns**: Formatted percentage string

---

### formatNumber(value, decimals?)
Format a number with locale-specific grouping.

```typescript
import { formatNumber } from '@/src/lib/formatting';

formatNumber(1234567); // "1.234.567"
formatNumber(1234567.89, 2); // "1.234.567,89"
```

**Parameters**:
- `value` (number): The number to format
- `decimals` (number, default: 0): Number of decimal places

**Returns**: Formatted number string

---

## Type Exports

**Location**: `src/lib/constants.ts`

### CountryCode
Union type of all supported country codes.

```typescript
import type { CountryCode } from '@/src/lib/constants';

// Valid values: 'DE' | 'FR' | 'AT' | ... (25+ countries)
const country: CountryCode = 'DE';

// Get config for country
const config = MARKET_DEFAULTS[country];
```

---

## Usage Patterns

### In Components
```tsx
import { MARKET_DEFAULTS, DEFAULT_INPUTS } from '@/src/lib/constants';
import { formatCurrency } from '@/src/lib/formatting';

function MyComponent() {
  const initialPrice = DEFAULT_INPUTS.homePrice;
  const country = MARKET_DEFAULTS.DE;
  
  return (
    <div>
      {formatCurrency(initialPrice)} in {country.name}
    </div>
  );
}
```

### In Hooks
```typescript
import { MARKET_DEFAULTS } from '@/src/lib/constants';

function useBuyVsRent(input: BuyVsRentInput) {
  const countryConfig = MARKET_DEFAULTS[input.country];
  const propertyTax = countryConfig.propertyTax;
  
  // Use in calculations...
}
```

---

## Adding New Constants

When adding new market data or configuration:

1. Add to appropriate const in `constants.ts`
2. Update type definitions if needed
3. Export from `src/lib/index.ts`
4. Document usage in this README

Example:
```typescript
// In constants.ts
export const NEW_FEATURE_CONFIG = {
  option1: 'value1',
  option2: 100,
};

// In index.ts
export { NEW_FEATURE_CONFIG } from './constants';

// Then import anywhere
import { NEW_FEATURE_CONFIG } from '@/src/lib';
```

---

## Testing Formatting Functions

```typescript
// Test currency formatting
expect(formatCurrency(100)).toBe('100 €');
expect(formatCurrency(1000)).toBe('1.000 €');

// Test percentage formatting
expect(formatPercentage(0.35)).toBe('35.0%');
expect(formatPercentage(0.035, 2)).toBe('3.50%');

// Test number formatting
expect(formatNumber(1234567)).toBe('1.234.567');
```
