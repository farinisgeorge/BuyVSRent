/**
 * Format a number as currency (EUR)
 * @param value - The number to format
 * @param currency - The currency code (default: EUR)
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(400000) // "400.000 €"
 */
export function formatCurrency(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a percentage value with specific decimal places
 * @param value - The value as a decimal (e.g., 0.35 for 35%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(0.35) // "35.0%"
 * formatPercentage(3.5, 0) // "350%"
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a large number with locale-specific grouping
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567) // "1.234.567"
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
