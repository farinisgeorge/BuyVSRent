/**
 * Comparison Table Component
 * Displays side-by-side comparison of buying vs renting scenarios
 */

import React from 'react';
import { useBuyVsRent, BuyVsRentInput } from '@/hooks/useBuyVsRent';
import { formatCurrency } from '../lib/formatting';

interface ComparisonTableProps {
  data: BuyVsRentInput;
  duration: number;
  theme: 'light' | 'dark';
}

/**
 * ComparisonTable component for displaying financial comparison
 * Shows initial costs, yearly spending, and final asset values
 * 
 * @param data - Calculator input data
 * @param duration - Analysis duration in years
 * @param theme - Visual theme ('light' or 'dark')
 */
export function ComparisonTable({
  data,
  duration,
  theme,
}: ComparisonTableProps) {
  const result = useBuyVsRent(data);

  const downPayment = data.homePrice * (data.downPaymentPercent / 100);
  const closingCosts = data.homePrice * (data.closingCostsPercent / 100);
  const totalBuyingInitial = downPayment + closingCosts + data.renovationCost;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Buying Path */}
      <div
        className={`rounded-xl p-5 border ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700'
            : 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300'
        }`}
      >
        <h3
          className={`text-base font-bold mb-3 ${
            theme === 'dark' ? 'text-blue-100' : 'text-blue-900'
          }`}
        >
          🏠 Buying Path
        </h3>
        <div className="space-y-2 text-sm">
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
            }`}
          >
            <span>Down Payment</span>
            <span className="font-semibold">{formatCurrency(downPayment)}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
            }`}
          >
            <span>Closing Costs</span>
            <span className="font-semibold">{formatCurrency(closingCosts)}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
            }`}
          >
            <span>Renovation/EPC</span>
            <span className="font-semibold">{formatCurrency(data.renovationCost)}</span>
          </div>
          <div
            className={`border-t pt-3 mt-3 ${
              theme === 'dark' ? 'border-blue-700' : 'border-blue-200'
            }`}
          >
            <div
              className={`flex justify-between ${
                theme === 'dark' ? 'text-blue-100' : 'text-blue-900'
              }`}
            >
              <span className="font-medium">Total Initial</span>
              <span className="font-bold">{formatCurrency(totalBuyingInitial)}</span>
            </div>
          </div>
          <div
            className={`border-t pt-2 mt-2 ${
              theme === 'dark' ? 'border-blue-700' : 'border-blue-200'
            }`}
          >
            <div
              className={`flex justify-between mb-1 ${
                theme === 'dark' ? 'text-blue-100' : 'text-blue-900'
              }`}
            >
              <span className="font-medium">Total {duration}Y Spending</span>
              <span className="font-bold text-sm">{formatCurrency(result.totalBuyingCosts)}</span>
            </div>
            <div
              className={`flex justify-between ${
                theme === 'dark' ? 'text-blue-100' : 'text-blue-900'
              }`}
            >
              <span className="font-medium">Final Home Value</span>
              <span className="font-bold text-sm">
                {formatCurrency(result.yearlyData[duration].homeValue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Renting + Investing Path */}
      <div
        className={`rounded-xl p-5 border ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-cyan-900 to-cyan-800 border-cyan-700'
            : 'bg-gradient-to-br from-cyan-100 to-cyan-50 border-cyan-300'
        }`}
      >
        <h3
          className={`text-base font-bold mb-3 ${
            theme === 'dark' ? 'text-cyan-100' : 'text-cyan-900'
          }`}
        >
          💰 Renting + Investing Path
        </h3>
        <div className="space-y-2 text-sm">
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-cyan-200' : 'text-cyan-800'
            }`}
          >
            <span>Initial Investment</span>
            <span className="font-semibold">{formatCurrency(totalBuyingInitial)}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-cyan-200' : 'text-cyan-800'
            }`}
          >
            <span>First Year Monthly Rent</span>
            <span className="font-semibold">{formatCurrency(data.monthlyRent)}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === 'dark' ? 'text-cyan-200' : 'text-cyan-800'
            }`}
          >
            <span>Annual Rent Growth</span>
            <span className="font-semibold">{data.rentGrowthAnnualPercent}%</span>
          </div>
          <div
            className={`border-t pt-2 mt-2 ${
              theme === 'dark' ? 'border-cyan-700' : 'border-cyan-200'
            }`}
          >
            <div
              className={`flex justify-between mb-1 ${
                theme === 'dark' ? 'text-cyan-100' : 'text-cyan-900'
              }`}
            >
              <span className="font-medium">Total {duration}Y Spending</span>
              <span className="font-bold text-sm">{formatCurrency(result.totalRentingCosts)}</span>
            </div>
            <div
              className={`border-t pt-2 mt-2 ${
                theme === 'dark' ? 'border-cyan-700' : 'border-cyan-200'
              }`}
            >
              <div
                className={`flex justify-between ${
                  theme === 'dark' ? 'text-cyan-100' : 'text-cyan-900'
                }`}
              >
                <span className="font-medium">Investment Portfolio Value</span>
                <span className="font-bold text-sm">
                  {formatCurrency(result.yearlyData[duration].investmentPortfolio)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
