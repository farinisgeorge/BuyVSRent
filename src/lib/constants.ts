/**
 * Market-specific default values for different countries
 * Includes buying costs, property tax, and selling costs percentages
 */
export const MARKET_DEFAULTS = {
  OTHER: {
    name: 'Other Country',
    buyingCosts: 3.0,
    propertyTax: 1.1,
    sellingCosts: 6.0,
  },
  // --- WESTERN & CENTRAL EUROPE ---
  DE: {
    name: 'Germany',
    buyingCosts: 11.5,
    propertyTax: 0.21,
    sellingCosts: 3.5,
  },
  FR: {
    name: 'France',
    buyingCosts: 7.5,
    propertyTax: 0.98,
    sellingCosts: 5.0,
  },
  AT: {
    name: 'Austria',
    buyingCosts: 10.5,
    propertyTax: 0.1,
    sellingCosts: 3.5,
  },
  BE: {
    name: 'Belgium',
    buyingCosts: 14.5,
    propertyTax: 0.62,
    sellingCosts: 3.0,
  },
  NL: {
    name: 'Netherlands',
    buyingCosts: 2.5,
    propertyTax: 0.51,
    sellingCosts: 1.5,
  },
  CH: {
    name: 'Switzerland',
    buyingCosts: 2.5,
    propertyTax: 0.08,
    sellingCosts: 2.0,
  },
  LU: {
    name: 'Luxembourg',
    buyingCosts: 9.5,
    propertyTax: 0.05,
    sellingCosts: 3.0,
  },
  // --- SOUTHERN EUROPE ---
  GR: {
    name: 'Greece',
    buyingCosts: 8.5,
    propertyTax: 1.13,
    sellingCosts: 2.5,
  },
  IT: {
    name: 'Italy',
    buyingCosts: 9.0,
    propertyTax: 0.62,
    sellingCosts: 3.0,
  },
  ES: {
    name: 'Spain',
    buyingCosts: 11.5,
    propertyTax: 0.58,
    sellingCosts: 5.0,
  },
  PT: {
    name: 'Portugal',
    buyingCosts: 8.5,
    propertyTax: 0.41,
    sellingCosts: 5.0,
  },
  CY: {
    name: 'Cyprus',
    buyingCosts: 5.0,
    propertyTax: 0.0,
    sellingCosts: 5.0,
  },
  MT: {
    name: 'Malta',
    buyingCosts: 5.0,
    propertyTax: 0.0,
    sellingCosts: 5.0,
  },
  // --- NORDICS ---
  SE: {
    name: 'Sweden',
    buyingCosts: 3.5,
    propertyTax: 0.35,
    sellingCosts: 2.5,
  },
  NO: {
    name: 'Norway',
    buyingCosts: 3.6,
    propertyTax: 0.21,
    sellingCosts: 2.5,
  },
  DK: {
    name: 'Denmark',
    buyingCosts: 2.5,
    propertyTax: 0.75,
    sellingCosts: 2.0,
  },
  FI: {
    name: 'Finland',
    buyingCosts: 4.0,
    propertyTax: 0.38,
    sellingCosts: 3.5,
  },
  // --- CENTRAL & EASTERN EUROPE ---
  PL: {
    name: 'Poland',
    buyingCosts: 4.5,
    propertyTax: 0.95,
    sellingCosts: 3.0,
  },
  CZ: {
    name: 'Czech Republic',
    buyingCosts: 4.5,
    propertyTax: 0.1,
    sellingCosts: 3.5,
  },
  HU: {
    name: 'Hungary',
    buyingCosts: 5.5,
    propertyTax: 0.25,
    sellingCosts: 4.0,
  },
  RO: {
    name: 'Romania',
    buyingCosts: 3.5,
    propertyTax: 0.15,
    sellingCosts: 3.0,
  },
  HR: {
    name: 'Croatia',
    buyingCosts: 4.5,
    propertyTax: 0.25,
    sellingCosts: 3.0,
  },
  BG: {
    name: 'Bulgaria',
    buyingCosts: 5.0,
    propertyTax: 0.2,
    sellingCosts: 2.5,
  },
  // --- IRELAND & UK ---
  IE: {
    name: 'Ireland',
    buyingCosts: 4.5,
    propertyTax: 0.29,
    sellingCosts: 2.0,
  },
  UK: {
    name: 'United Kingdom',
    buyingCosts: 5.5,
    propertyTax: 1.94,
    sellingCosts: 3.0,
  },
  // --- NORTH AMERICA ---
  US: {
    name: 'USA (National Avg)',
    buyingCosts: 3.0,
    propertyTax: 1.1,
    sellingCosts: 6.0,
  },
} as const;

/**
 * Step information for the calculator wizard
 */
export const STEP_INFO = [
  {
    number: 1,
    title: 'Property Details',
    description: 'Set home price and market country',
  },
  {
    number: 2,
    title: 'Buying Assumptions',
    description: 'Configure mortgage and ownership costs',
  },
  {
    number: 3,
    title: 'Renting Assumptions',
    description: 'Configure rent and investment returns',
  },
] as const;

/**
 * Default values for calculator inputs
 */
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
} as const;

/**
 * Slider configuration for input fields
 */
export const SLIDER_CONFIG = {
  homePrice: { min: 50000, max: 10000000, step: 10000 },
  durationYears: { min: 1, max: 50, step: 1 },
  homeAppreciation: { min: -5, max: 10, step: 0.5 },
  downPayment: { min: 0, max: 50, step: 1 },
  mortgageRate: { min: 0, max: 15, step: 0.1 },
  mortgagePeriod: { min: 5, max: 50, step: 1 },
  closingCosts: { min: 0, max: 20, step: 0.5 },
  renovationCost: { min: 0, max: 500000, step: 5000 },
  hoaMonthly: { min: 0, max: 1000, step: 50 },
  maintenance: { min: 0, max: 3, step: 0.1 },
  sellingCosts: { min: 0, max: 10, step: 0.5 },
  mortgageDeduction: { min: 0, max: 100, step: 1 },
  monthlyRent: { min: 100, max: 10000, step: 50 },
  rentGrowth: { min: -5, max: 10, step: 0.5 },
  investmentReturn: { min: -5, max: 20, step: 0.5 },
} as const;

export type CountryCode = keyof typeof MARKET_DEFAULTS;
