'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useBuyVsRent, BuyVsRentInput } from '@/hooks/useBuyVsRent';
import { DetailedReport } from '@/src/components/DetailedReport';
import { Download, Home } from 'lucide-react';

/** Market data for countries - loaded from query params */
const MARKET_DEFAULTS = {
  DE: { name: 'Germany', buyingCosts: 11.5, propertyTax: 0.21, sellingCosts: 3.5 },
  FR: { name: 'France', buyingCosts: 7.5, propertyTax: 0.98, sellingCosts: 5.0 },
  AT: { name: 'Austria', buyingCosts: 10.5, propertyTax: 0.1, sellingCosts: 3.5 },
  US: { name: 'USA', buyingCosts: 3.0, propertyTax: 1.1, sellingCosts: 6.0 },
};

/**
 * Format number as currency (EUR)
 * @param value - Number to format
 * @returns Formatted currency string
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Shareable report content component
 * Displays detailed buy vs rent analysis with charts and tables
 */
export default function ReportContent() {
  const searchParams = useSearchParams();

  // Reconstruct input parameters from URL
  const reportData = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    
    return {
      country: params.country || 'DE',
      homePrice: parseFloat(params.homePrice || '400000'),
      durationYears: parseInt(params.duration || '10'),
      homeAppreciation: parseFloat(params.appreciation || '3'),
      downPayment: parseFloat(params.downPayment || '20'),
      mortgageRate: parseFloat(params.mortgageRate || '3.5'),
      mortgagePeriod: parseFloat(params.mortgagePeriod || '25'),
      closingCosts: parseFloat(params.closingCosts || '11.5'),
      renovationCost: parseFloat(params.renovationCost || '25000'),
      hoaMonthly: parseFloat(params.hoaMonthly || '200'),
      maintenanceAnnual: parseFloat(params.maintenanceAnnual || '1'),
      sellingCosts: parseFloat(params.sellingCosts || '3.5'),
      mortgageDeduction: parseFloat(params.mortgageDeduction || '0'),
      monthlyRent: parseFloat(params.rent || '1500'),
      rentGrowth: parseFloat(params.rentGrowth || '2'),
      investmentReturn: parseFloat(params.investmentReturn || '7'),
      investmentTaxRate: parseFloat(params.investmentTaxRate || '15'),
    };
  }, [searchParams]);

  const countryConfig = MARKET_DEFAULTS[reportData.country as keyof typeof MARKET_DEFAULTS];

  const input: BuyVsRentInput = {
    homePrice: reportData.homePrice,
    durationYears: reportData.durationYears,
    homeAppreciationAnnual: reportData.homeAppreciation,
    downPaymentPercent: reportData.downPayment,
    mortgageRatePercent: reportData.mortgageRate,
    mortgagePeriodYears: reportData.mortgagePeriod,
    closingCostsPercent: reportData.closingCosts,
    renovationCost: reportData.renovationCost,
    hoaMonthlyFee: reportData.hoaMonthly,
    maintenanceAnnualPercent: reportData.maintenanceAnnual,
    propertyTaxAnnualPercent: countryConfig?.propertyTax || 1.1,
    sellingCostsPercent: reportData.sellingCosts,
    mortgageInterestDeductionPercent: reportData.mortgageDeduction,
    monthlyRent: reportData.monthlyRent,
    rentGrowthAnnualPercent: reportData.rentGrowth,
    investmentReturnAnnual: reportData.investmentReturn,
    investmentTaxRatePercent: reportData.investmentTaxRate,
  };

  const result = useBuyVsRent(input);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `BuyVsRent_${reportData.country}_${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (error) {
      alert('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar - Hide on print */}
      <div className="print:hidden sticky top-0 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-slate-900">Stealth Investor Report</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPNG}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download size={18} />
              Download PNG
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              🖨️ Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-6xl mx-auto px-8 py-12" id="report-content">
        {/* Header */}
        <div className="mb-8 border-b-2 border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Buy vs Rent Analysis Report</h2>
          <p className="text-slate-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Scenario Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📋 Scenario Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Country</dt>
                <dd className="font-semibold text-slate-900">{countryConfig?.name || reportData.country}</dd>
              </div>
              <div className="flex justify-between border-t pt-3">
                <dt className="text-slate-600">Home Price</dt>
                <dd className="font-semibold text-slate-900">{formatCurrency(reportData.homePrice)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Down Payment</dt>
                <dd className="font-semibold text-slate-900">{reportData.downPayment}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Monthly Rent</dt>
                <dd className="font-semibold text-slate-900">{formatCurrency(reportData.monthlyRent)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Analysis Period</dt>
                <dd className="font-semibold text-slate-900">{reportData.durationYears} years</dd>
              </div>
            </dl>
          </div>

          {/* Key Results */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🎯 Final Verdict</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-700 font-semibold">Winner</p>
                <p className="text-2xl font-black text-blue-900">
                  {result.buyingWins ? '🏠 Buying' : '💰 Renting + Investing'}
                </p>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <p className="text-sm text-blue-700 font-semibold">Financial Advantage</p>
                <p className="text-xl font-bold text-emerald-600">
                  +{formatCurrency(Math.abs(result.difference))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Net Worth Chart */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">📈 Net Worth Projection Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={result.yearlyData.slice(0, reportData.durationYears + 1)}>
              <defs>
                <linearGradient id="colorBuying" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRenting" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value) =>
                  typeof value === 'number' ? formatCurrency(value) : value
                }
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="buyingNetWorth"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBuying)"
                name="Buying Net Worth"
              />
              <Area
                type="monotone"
                dataKey="rentingNetWorth"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRenting)"
                name="Renting + Investing"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Buying Path */}
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏠 Buying Path - Year {reportData.durationYears}</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-blue-700">Home Value</dt>
                <dd className="font-semibold text-blue-900">
                  {formatCurrency(result.yearlyData[reportData.durationYears].homeValue)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-blue-700">Mortgage Balance</dt>
                <dd className="font-semibold text-blue-900">
                  {formatCurrency(result.yearlyData[reportData.durationYears].mortgageBalance)}
                </dd>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold">
                <dt className="text-blue-900">Net Worth</dt>
                <dd className="text-blue-900">
                  {formatCurrency(result.finalBuyingNetWorth)}
                </dd>
              </div>
              <div className="flex justify-between text-xs text-blue-600 pt-2">
                <dt>Total Costs Over {reportData.durationYears}Y</dt>
                <dd>{formatCurrency(result.totalBuyingCosts)}</dd>
              </div>
            </dl>
          </div>

          {/* Renting Path */}
          <div className="bg-cyan-50 p-6 rounded-lg border-2 border-cyan-200">
            <h3 className="text-lg font-bold text-cyan-900 mb-4">💰 Renting + Investing - Year {reportData.durationYears}</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-cyan-700">Investment Portfolio</dt>
                <dd className="font-semibold text-cyan-900">
                  {formatCurrency(result.yearlyData[reportData.durationYears].investmentPortfolio)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cyan-700">Liquid Assets</dt>
                <dd className="font-semibold text-cyan-900">
                  {formatCurrency(result.finalRentingNetWorth)}
                </dd>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold">
                <dt className="text-cyan-900">Net Worth</dt>
                <dd className="text-cyan-900">
                  {formatCurrency(result.finalRentingNetWorth)}
                </dd>
              </div>
              <div className="flex justify-between text-xs text-cyan-600 pt-2">
                <dt>Total Costs Over {reportData.durationYears}Y</dt>
                <dd>{formatCurrency(result.totalRentingCosts)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Premium Detailed Report - Year-by-Year Breakdown, Amortization, Tax Analysis */}
        <DetailedReport
          result={result}
          durationYears={reportData.durationYears}
          homePrice={reportData.homePrice}
          mortgageRatePercent={reportData.mortgageRate}
          investmentReturnAnnual={reportData.investmentReturn}
          closingCostsPercent={reportData.closingCosts}
          sellingCostsPercent={reportData.sellingCosts}
          downPaymentPercent={reportData.downPayment}
        />

        {/* Detailed Analysis */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">🔍 Detailed Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-slate-600 font-semibold mb-2">Buying Advantages</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Building equity through ownership</li>
                <li>Fixed mortgage payments</li>
                <li>Tax deductions (where applicable)</li>
                <li>Protection from rent increases</li>
              </ul>
            </div>
            <div>
              <p className="text-slate-600 font-semibold mb-2">Renting Advantages</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Flexibility to relocate</li>
                <li>Lower upfront costs</li>
                <li>No maintenance responsibility</li>
                <li>Investment growth potential</li>
              </ul>
            </div>
            <div>
              <p className="text-slate-600 font-semibold mb-2">Key Metrics</p>
              <ul className="space-y-1 text-slate-700">
                <li><strong>Break-even:</strong> Year {result.breakEvenYear || 'N/A'}</li>
                <li><strong>Home appreciation:</strong> {reportData.homeAppreciation}% p.a.</li>
                <li><strong>Investment return:</strong> {reportData.investmentReturn}% p.a.</li>
                <li><strong>Mortgage rate:</strong> {reportData.mortgageRate}%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Calculated These Results */}
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-12">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">📊 How We Calculated These Results</h3>
          
          <div className="space-y-4 text-sm text-indigo-900">
            <div>
              <h4 className="font-bold text-indigo-900 mb-2">🏠 Buying Path Calculation</h4>
              <p className="mb-3">This analysis follows the standard real estate appraisal methodology, tracking your equity position over time:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-indigo-800">
                <li><strong>Initial Investment:</strong> Down payment ({reportData.downPayment}%) + Closing costs + Renovation cost = {formatCurrency((reportData.homePrice * (reportData.downPayment / 100)) + (reportData.homePrice * (reportData.closingCosts / 100)) + reportData.renovationCost)}</li>
                <li><strong>Monthly Mortgage Payment:</strong> Calculated using standard amortization formula at {reportData.mortgageRate}% for {reportData.mortgagePeriod} years</li>
                <li><strong>Annual Costs:</strong> Property tax + Maintenance + HOA fees - Tax deductions (if applicable)</li>
                <li><strong>Property Appreciation:</strong> Home value grows at {reportData.homeAppreciation}% annually</li>
                <li><strong>Net Worth at Year {reportData.durationYears}:</strong> Current home value - remaining mortgage balance - selling costs</li>
                <li><strong>Final Equity:</strong> {formatCurrency(result.finalBuyingNetWorth)}</li>
              </ul>
            </div>

            <div className="border-t border-indigo-300 pt-4">
              <h4 className="font-bold text-indigo-900 mb-2">💰 Renting + Investing Path Calculation</h4>
              <p className="mb-3">This follows the "Opportunity Cost" methodology, where renter's savings are invested in the stock market:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-indigo-800">
                <li><strong>Initial Investment:</strong> Same as buyer's initial cash out ({formatCurrency((reportData.homePrice * (reportData.downPayment / 100)) + (reportData.homePrice * (reportData.closingCosts / 100)) + reportData.renovationCost)}) immediately invested in S&P 500</li>
                <li><strong>Monthly Rent:</strong> {formatCurrency(reportData.monthlyRent)} in year 1, growing at {reportData.rentGrowth}% annually</li>
                <li><strong>Opportunity Cost Investment:</strong> The difference between buyer's monthly housing costs and renter's monthly rent is invested in S&P 500</li>
                <li><strong>Investment Growth:</strong> Portfolio grows at {reportData.investmentReturn}% annually with monthly compounding</li>
                <li><strong>Final Portfolio Value:</strong> {formatCurrency(result.finalRentingNetWorth)}</li>
              </ul>
            </div>

            <div className="border-t border-indigo-300 pt-4">
              <h4 className="font-bold text-indigo-900 mb-2">🎯 Comparison & Verdict</h4>
              <p className="mb-2">
                After {reportData.durationYears} years, we compare the final net worth of both scenarios:
              </p>
              <div className="bg-white rounded p-3 text-indigo-900 mb-2">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Buying Net Worth:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(result.finalBuyingNetWorth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Renting Net Worth:</span>
                  <span className="font-bold text-cyan-600">{formatCurrency(result.finalRentingNetWorth)}</span>
                </div>
              </div>
              <p>
                <strong>Winner: {result.buyingWins ? '🏠 Buying' : '💰 Renting + Investing'}</strong>
                {result.breakEvenYear && <span> - Break-even at year {result.breakEvenYear}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Methodology & Assumptions */}
        <div className="bg-white border-2 border-slate-300 p-8 rounded-lg mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">📖 Detailed Methodology & Assumptions</h3>
          
          <div className="space-y-8">
            {/* Buying Path Methodology */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-400 pb-2">🏠 Buying Path Methodology</h4>
              
              <div className="space-y-4 text-slate-700 text-sm">
                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Initial Investment</h5>
                  <p className="mb-2">When buying a property, you need to pay:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li><strong>Down Payment:</strong> {reportData.downPayment}% × {formatCurrency(reportData.homePrice)} = {formatCurrency(reportData.homePrice * (reportData.downPayment / 100))}</li>
                    <li><strong>Closing Costs:</strong> {reportData.closingCosts}% × {formatCurrency(reportData.homePrice)} = {formatCurrency(reportData.homePrice * (reportData.closingCosts / 100))} (varies by country - includes notary, transfer taxes, registration)</li>
                    <li><strong>Renovation/EPC Improvement:</strong> {formatCurrency(reportData.renovationCost)}</li>
                    <li className="font-bold text-blue-900">Total Initial: {formatCurrency((reportData.homePrice * (reportData.downPayment / 100)) + (reportData.homePrice * (reportData.closingCosts / 100)) + reportData.renovationCost)}</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Mortgage Calculation</h5>
                  <p className="mb-2">Loan amount: {formatCurrency(reportData.homePrice - (reportData.homePrice * (reportData.downPayment / 100)))}</p>
                  <p className="mb-2">Using standard amortization formula at {reportData.mortgageRate}% for {reportData.mortgagePeriod} years:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Monthly payment is fixed and doesn't change over the mortgage period</li>
                    <li>Early payments go mostly to interest, later payments to principal</li>
                    <li>The outstanding balance decreases each month</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Annual Costs</h5>
                  <p className="mb-2">Every year of ownership, you pay:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li><strong>Property Tax:</strong> {countryConfig?.propertyTax || 1.1}% of home value annually (varies by country)</li>
                    <li><strong>Maintenance & Repairs:</strong> {reportData.maintenanceAnnual}% of home value annually</li>
                    <li><strong>HOA/Management Fees:</strong> {formatCurrency(reportData.hoaMonthly)} per month ({formatCurrency(reportData.hoaMonthly * 12)} annually)</li>
                    <li><strong>Tax Deduction Benefit:</strong> {reportData.mortgageDeduction}% of mortgage interest (where applicable)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Property Appreciation</h5>
                  <p>Your home value increases at {reportData.homeAppreciation}% per year. After {reportData.durationYears} years: {formatCurrency(result.yearlyData[reportData.durationYears].homeValue)}</p>
                </div>

                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Selling Costs</h5>
                  <p className="mb-2">If you sell at year {reportData.durationYears}, you pay {reportData.sellingCosts}% of sale price in realtor fees, transfer taxes, etc.</p>
                  <p className="text-blue-900">Selling costs: {formatCurrency(result.yearlyData[reportData.durationYears].homeValue * (reportData.sellingCosts / 100))}</p>
                </div>

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-900">Final Buying Net Worth</p>
                  <p className="text-sm text-blue-800 mt-1">Home Value - Remaining Mortgage - Selling Costs = <span className="font-bold">{formatCurrency(result.finalBuyingNetWorth)}</span></p>
                </div>
              </div>
            </div>

            {/* Renting Path Methodology */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-cyan-400 pb-2">💰 Renting + Investing Path Methodology</h4>
              
              <div className="space-y-4 text-slate-700 text-sm">
                <div>
                  <h5 className="font-bold text-cyan-900 mb-2">Initial Investment Strategy</h5>
                  <p className="mb-2">Instead of using money for a down payment, you invest the same amount:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Initial capital: {formatCurrency((reportData.homePrice * (reportData.downPayment / 100)) + (reportData.homePrice * (reportData.closingCosts / 100)) + reportData.renovationCost)}</li>
                    <li>Invested in S&P 500 index (historical average return: {reportData.investmentReturn}%)</li>
                    <li>Grows with monthly compounding over {reportData.durationYears} years</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-cyan-900 mb-2">Monthly Rent & Growth</h5>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Year 1 rent: {formatCurrency(reportData.monthlyRent)}/month</li>
                    <li>Rent grows at {reportData.rentGrowth}% annually to reflect inflation</li>
                    <li>After {reportData.durationYears} years, monthly rent reaches: {formatCurrency(reportData.monthlyRent * Math.pow((1 + reportData.rentGrowth / 100), reportData.durationYears))}</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-cyan-900 mb-2">Opportunity Cost Investment (Core Concept)</h5>
                  <p className="mb-2">The key insight: Each month, we compare buyer and renter costs:</p>
                  <p className="mb-2"><strong>Buyer Monthly Cost:</strong> Mortgage + Property Tax + Maintenance + HOA</p>
                  <p className="mb-2"><strong>Renter Monthly Cost:</strong> Rent only</p>
                  <p className="mb-3"><strong>Monthly Surplus:</strong> If buyer costs exceed renter costs, renter invests the difference in S&P 500</p>
                  <p className="bg-cyan-50 p-2 rounded text-cyan-900">
                    This ensures the renter takes advantage of every dollar saved by not owning, compounding returns monthly
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-cyan-900 mb-2">Investment Growth</h5>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Portfolio grows at {reportData.investmentReturn}% annually</li>
                    <li>Growth is compounded <strong>monthly</strong> for accuracy: ({reportData.investmentReturn}% ÷ 12 per month)</li>
                    <li>Additional monthly contributions (opportunity cost) are also invested and grow</li>
                  </ul>
                </div>

                <div className="bg-cyan-50 p-3 rounded border-l-4 border-cyan-400">
                  <p className="font-bold text-cyan-900">Final Renting Net Worth</p>
                  <p className="text-sm text-cyan-800 mt-1">Total Investment Portfolio Value = <span className="font-bold">{formatCurrency(result.finalRentingNetWorth)}</span></p>
                </div>
              </div>
            </div>

            {/* Key Assumptions */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-amber-400 pb-2">⚠️ Key Assumptions & Limitations</h4>
              
              <div className="space-y-4 text-slate-700 text-sm">
                <div>
                  <h5 className="font-bold text-amber-900 mb-2">What This Analysis Includes</h5>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Mortgage amortization with monthly compounding</li>
                    <li>Property appreciation at {reportData.homeAppreciation}% annually</li>
                    <li>Investment growth at {reportData.investmentReturn}% annually (S&P 500 historical average)</li>
                    <li>Monthly rent growth at {reportData.rentGrowth}% annually</li>
                    <li>Property taxes, maintenance costs, and HOA fees (country-specific)</li>
                    <li>Mortgage interest tax deductions (where applicable)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-amber-900 mb-2">What This Analysis Does NOT Include</h5>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Income growth or inflation (only rent and property growth are modeled)</li>
                    <li>Insurance costs (home or renter's)</li>
                    <li>Utilities and other occupancy costs</li>
                    <li>Stock market volatility or negative years</li>
                    <li>Capital gains taxes on investments when selling</li>
                    <li>Moving costs or transaction fees for renting</li>
                    <li>Emotional or lifestyle factors</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                  <p className="font-bold text-amber-900 text-sm">💡 The Assumptions Matter</p>
                  <p className="text-xs text-amber-800 mt-1">Small changes in home appreciation, rent growth, or investment returns can significantly change the outcome. We recommend running multiple scenarios with different assumptions.</p>
                </div>
              </div>
            </div>

            {/* Additional Context */}
            <div className="bg-slate-100 p-4 rounded">
              <h5 className="font-bold text-slate-900 mb-2">🎯 How to Interpret These Results</h5>
              <ul className="list-disc list-inside ml-2 space-y-2 text-sm text-slate-700">
                <li>This analysis shows the <strong>financial advantage only</strong> - not lifestyle or personal preferences</li>
                <li>The "break-even" year shows when one scenario catches up to the other</li>
                <li>These are <strong>theoretical calculations</strong> based on average assumptions</li>
                <li>Your actual experience may differ based on local market conditions, personal choices, and economic changes</li>
                <li>Use this as a <strong>planning tool</strong>, not as financial advice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">⚠️ Important Disclaimer</p>
          <p>
            This analysis is for educational and planning purposes only. It does not constitute financial advice.
            The results are based on assumptions about market conditions, interest rates, and personal circumstances that may vary significantly.
            Please consult with a financial advisor before making major financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
