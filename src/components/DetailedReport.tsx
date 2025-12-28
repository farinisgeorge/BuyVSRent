'use client';

import React from 'react';
import { BuyVsRentResult } from '@/hooks/useBuyVsRent';
import { formatCurrency, formatPercentage, formatNumber } from '@/src/lib/formatting';

interface DetailedReportProps {
  result: BuyVsRentResult;
  durationYears: number;
  homePrice: number;
  mortgageRatePercent: number;
  investmentReturnAnnual: number;
  closingCostsPercent: number;
  sellingCostsPercent: number;
  downPaymentPercent: number;
}

/**
 * Detailed report with year-by-year breakdown, amortization, and tax analysis
 */
export function DetailedReport({
  result,
  durationYears,
  homePrice,
  mortgageRatePercent,
  investmentReturnAnnual,
  closingCostsPercent,
  sellingCostsPercent,
  downPaymentPercent,
}: DetailedReportProps) {
  // Calculate down payment and closing costs
  const downPayment = homePrice * (downPaymentPercent / 100);
  const closingCosts = homePrice * (closingCostsPercent / 100);
  const sellingCosts = result.yearlyData[durationYears].homeValue * (sellingCostsPercent / 100);

  // Calculate total interest paid
  const totalMortgagePayments = result.yearlyData[durationYears].mortgageBalance > 0
    ? result.totalBuyingCosts - downPayment - closingCosts
    : 0;
  const loanAmount = homePrice - downPayment;
  const totalInterestPaid = totalMortgagePayments - loanAmount;

  // Calculate investment performance
  const initialInvestment = downPayment + closingCosts;
  const finalPortfolioValue = result.finalRentingNetWorth;
  const investmentGains = finalPortfolioValue - initialInvestment;

  // Calculate tax implications
  const totalPropertyTaxesPaid = result.yearlyData
    .slice(1, durationYears + 1)
    .reduce((sum, year) => {
      const yearHomeValue = year.homeValue;
      const propertyTax = yearHomeValue * 0.0021; // Assuming 0.21% for Germany
      return sum + propertyTax;
    }, 0);

  const totalUpfrontTaxes = downPayment * (closingCostsPercent / 100);
  const totalTaxesPaid = totalUpfrontTaxes + totalPropertyTaxesPaid;

  // Years to break even on upfront costs through appreciation
  let yearsToBreakEvenOnTaxes = 0;
  let appreciation = 0;
  for (let i = 1; i <= durationYears; i++) {
    appreciation = result.yearlyData[i].homeValue - homePrice;
    if (appreciation >= totalUpfrontTaxes) {
      yearsToBreakEvenOnTaxes = i;
      break;
    }
  }

  return (
    <div className="space-y-8">
      {/* Year-by-Year Investment Comparison */}
      <div className="bg-white rounded-lg border border-slate-300 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-300">
          <h3 className="text-lg font-bold text-slate-900">
            📊 Year-by-Year Investment Comparison
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Track how buying equity and investment portfolio grow over time
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Year</th>
                <th className="px-4 py-3 text-right font-semibold text-blue-900">
                  Home Value
                </th>
                <th className="px-4 py-3 text-right font-semibold text-blue-900">
                  Mortgage Balance
                </th>
                <th className="px-4 py-3 text-right font-semibold text-blue-900">
                  Home Equity
                </th>
                <th className="px-4 py-3 text-right font-semibold text-cyan-900">
                  Portfolio Value
                </th>
                <th className="px-4 py-3 text-right font-semibold text-amber-900">
                  Better By
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyData
                .filter((_, idx) => idx % Math.ceil(durationYears / 10) === 0 || idx === durationYears)
                .map((year) => {
                  const homeEquity = year.homeValue - year.mortgageBalance;
                  const difference = homeEquity - year.rentingNetWorth;
                  const winner = difference > 0 ? 'Buying' : 'Renting';

                  return (
                    <tr key={year.year} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        Year {year.year}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(year.homeValue)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(year.mortgageBalance)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-blue-700">
                        {formatCurrency(homeEquity)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-cyan-700">
                        {formatCurrency(year.rentingNetWorth)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-bold ${
                            winner === 'Buying' ? 'text-blue-600' : 'text-cyan-600'
                          }`}
                        >
                          {winner}
                          <br />
                          {formatCurrency(Math.abs(difference))}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div className="bg-white rounded-lg border border-slate-300 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-300">
          <h3 className="text-lg font-bold text-slate-900">💰 Amortization Schedule</h3>
          <p className="text-sm text-slate-600 mt-1">
            How much interest vs. principal you pay each year
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Year</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Principal Paid
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Interest Paid
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Total Payment
                </th>
                <th className="px-4 py-3 text-right font-semibold text-red-900">
                  Remaining Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyData
                .slice(1, durationYears + 1)
                .filter((_, idx) => idx % Math.ceil(durationYears / 10) === 0 || idx === durationYears - 1)
                .map((year, idx) => {
                  const prevMortgage = idx === 0 
                    ? result.yearlyData[0].mortgageBalance
                    : result.yearlyData[year.year - 1].mortgageBalance;
                  
                  const principalPaid = prevMortgage - year.mortgageBalance;
                  const yearPayments = year.buyerMonthlyExpense * 12;
                  const interestPaid = yearPayments - principalPaid;

                  return (
                    <tr key={year.year} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">Year {year.year}</td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(Math.max(0, principalPaid))}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-red-700">
                        {formatCurrency(Math.max(0, interestPaid))}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(yearPayments)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-red-700">
                        {formatCurrency(year.mortgageBalance)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Interest Summary */}
        <div className="px-6 py-4 bg-red-50 border-t border-slate-300">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600">Total Interest Over {durationYears} Years</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatCurrency(Math.max(0, totalInterestPaid))}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Average Annual Interest</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatCurrency(Math.max(0, totalInterestPaid) / durationYears)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Interest as % of Loan</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatPercentage((Math.max(0, totalInterestPaid) / loanAmount) * 100)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Implications Analysis */}
      <div className="bg-white rounded-lg border border-slate-300 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-slate-300">
          <h3 className="text-lg font-bold text-slate-900">🏛️ Tax Implications Analysis</h3>
          <p className="text-sm text-slate-600 mt-1">
            Transfer taxes, property taxes, and appreciation break-even
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Upfront Costs */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Upfront Purchase Costs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-600">Down Payment ({downPaymentPercent}%)</p>
                <p className="text-2xl font-bold text-amber-700 mt-1">
                  {formatCurrency(downPayment)}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-600">
                  Transfer/Closing Costs ({closingCostsPercent}%)
                </p>
                <p className="text-2xl font-bold text-amber-700 mt-1">
                  {formatCurrency(closingCosts)}
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  Includes notary, registration, transfer taxes
                </p>
              </div>
            </div>
          </div>

          {/* Break-even Analysis */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">Break-Even Analysis</h4>
            <p className="text-slate-700 mb-3">
              It takes <strong>{yearsToBreakEvenOnTaxes} years</strong> of home appreciation to
              recover your upfront transfer taxes ({formatCurrency(totalUpfrontTaxes)})
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-600">Total Taxes Paid</p>
                <p className="font-bold text-indigo-900 mt-1">
                  {formatCurrency(totalUpfrontTaxes)}
                </p>
              </div>
              <div>
                <p className="text-slate-600">Home Appreciation by Year {yearsToBreakEvenOnTaxes}</p>
                <p className="font-bold text-indigo-900 mt-1">
                  {formatCurrency(result.yearlyData[yearsToBreakEvenOnTaxes]?.homeValue - homePrice || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Annual Tax Burden */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Cumulative Tax Burden</h4>
            <p className="text-sm text-slate-600 mb-3">
              Property taxes paid over {durationYears} years
            </p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-600">Total Property Taxes</p>
                  <p className="text-3xl font-bold text-amber-700 mt-2">
                    {formatCurrency(totalPropertyTaxesPaid)}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    Average: {formatCurrency(totalPropertyTaxesPaid / durationYears)}/year
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">As % of Home Value</p>
                  <p className="text-2xl font-bold text-amber-700 mt-2">
                    {formatPercentage((totalPropertyTaxesPaid / (homePrice * durationYears)) * 100)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Gains (Tax-Free in Many Countries) */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">Investment Portfolio Gains (Renting Path)</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Initial Investment</p>
                <p className="font-bold text-green-700 mt-1">
                  {formatCurrency(initialInvestment)}
                </p>
              </div>
              <div>
                <p className="text-slate-600">Final Portfolio Value</p>
                <p className="font-bold text-green-700 mt-1">
                  {formatCurrency(finalPortfolioValue)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-600">Investment Gains</p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  {formatCurrency(investmentGains)}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Average annual return: {investmentReturnAnnual}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-300 p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-4">💡 Key Insights</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              You'll pay <strong>{formatCurrency(Math.max(0, totalInterestPaid))}</strong> in
              interest over {durationYears} years - that's{' '}
              <strong>
                {formatPercentage(((Math.max(0, totalInterestPaid) / loanAmount) * 100))}
              </strong>{' '}
              of your loan amount
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              Transfer taxes will be recovered in just <strong>{yearsToBreakEvenOnTaxes} years</strong>{' '}
              through home appreciation
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              By renting, you could accumulate{' '}
              <strong>{formatCurrency(investmentGains)}</strong> in investment gains
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {result.breakEvenYear
                ? `The paths cross at year ${result.breakEvenYear}`
                : 'Buying is better from the start'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
