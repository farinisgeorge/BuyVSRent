# Components Documentation

Reusable UI components for the Investor's Toolbox calculator.

## StepIndicator

Multi-step progress indicator for wizard-style forms.

**Location**: `src/components/StepIndicator.tsx`

### Features
- Visual progress through numbered steps
- Completed steps show checkmark (✓)
- Current step highlighted with ring effect
- Equal spacing and alignment
- Responsive design
- Accessibility support (ARIA labels)

### Props
- `currentStep` (number): Active step number (1-indexed)
- `steps` (Step[]): Array of step objects
- `theme` ('light' | 'dark'): Visual theme
- `onStepClick?` (function): Optional click handler for steps

### Example
```tsx
import { StepIndicator } from '@/src/components';

<StepIndicator
  currentStep={2}
  steps={[
    { number: 1, title: 'Property', description: 'Set price and duration' },
    { number: 2, title: 'Buying', description: 'Configure mortgage' },
    { number: 3, title: 'Renting', description: 'Set rent and returns' }
  ]}
  theme="dark"
  onStepClick={(step) => setCurrentStep(step)}
/>
```

### Styling Notes
- Width fills container with proper spacing
- Circles are 48px (w-12 h-12)
- Connector lines have gradient fill
- Responsive gap adjustment for mobile

---

## SliderField

Numeric input field with visual slider and gradient progress.

**Location**: `src/components/SliderField.tsx`

### Features
- Gradient-filled slider showing progress
- Responsive layout (flex with value display)
- Accessible slider with proper ARIA attributes
- Theme support (light/dark)
- Optional info tooltip
- Customizable units (€, %, years, etc.)

### Props
- `label` (string): Field label text
- `value` (number): Current value
- `min` (number): Minimum allowed value
- `max` (number): Maximum allowed value
- `step` (number): Increment/decrement step size
- `unit` (string): Unit suffix (€, %, etc.)
- `onChange` (function): Change handler
- `info?` (string): Optional info tooltip
- `theme` ('light' | 'dark'): Visual theme

### Example
```tsx
import { SliderField } from '@/src/components';

<SliderField
  label="Home Price"
  value={homePrice}
  min={50000}
  max={10000000}
  step={10000}
  unit="€"
  onChange={setHomePrice}
  info="Target property purchase price in Euros"
  theme="dark"
/>
```

### Styling Notes
- Slider uses custom CSS for thumb styling (Webkit & Mozilla compatible)
- Gradient calculated as percentage: `((value - min) / (max - min)) * 100`
- Value display fixed width (w-24) for alignment
- Info icon size: 14px

---

## ComparisonTable

Side-by-side financial comparison of buying vs renting scenarios.

**Location**: `src/components/ComparisonTable.tsx`

### Features
- Two-column grid layout (responsive)
- Color-coded sections (blue for buying, cyan for renting)
- Displays initial costs, yearly spending, final values
- Automatically calculates using `useBuyVsRent` hook
- Theme support

### Props
- `data` (BuyVsRentInput): Calculator input parameters
- `duration` (number): Analysis duration in years
- `theme` ('light' | 'dark'): Visual theme

### Example
```tsx
import { ComparisonTable } from '@/src/components';

<ComparisonTable
  data={{
    homePrice: 400000,
    durationYears: 10,
    // ... other inputs
  }}
  duration={10}
  theme="dark"
/>
```

### Data Displayed

**Buying Path**:
- Down payment (% of price)
- Closing costs (% of price)
- Renovation costs (absolute €)
- Total initial investment
- Total X-year spending
- Final home value after appreciation

**Renting Path**:
- Initial investment (down payment equivalent)
- First year monthly rent
- Annual rent growth rate
- Total X-year spending
- Investment portfolio final value

---

## Component Design Principles

1. **Single Responsibility**: Each component handles one concern
2. **Prop-Based Configuration**: No hardcoded values
3. **Theme Support**: All components support light/dark themes
4. **Accessibility**: ARIA labels and semantic HTML
5. **Responsiveness**: Works on mobile, tablet, desktop
6. **Documented**: JSDoc comments for all props and features

---

## Adding New Components

When creating new components:

1. Create file in `src/components/ComponentName.tsx`
2. Add JSDoc comments for component and all props
3. Export from `src/components/index.ts`
4. Include example usage in this file
5. Consider theme support
6. Ensure accessibility (ARIA attributes, semantic HTML)

Example template:

```tsx
/**
 * ComponentName Component
 * Brief description of what this component does
 */

import React from 'react';

interface ComponentNameProps {
  // Document all props
  prop1: string;
  prop2: number;
  theme: 'light' | 'dark';
}

/**
 * ComponentName - detailed description
 * 
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 * @param theme - Visual theme
 * 
 * @example
 * <ComponentName prop1="value" prop2={123} theme="dark" />
 */
export function ComponentName({ prop1, prop2, theme }: ComponentNameProps) {
  return (
    // Component JSX
  );
}
```
