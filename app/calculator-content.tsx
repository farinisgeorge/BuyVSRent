'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { SliderField } from '@/src/components/SliderField';
import { AuthModal } from '@/src/components/AuthModal';
import { MARKET_DEFAULTS, DEFAULT_INPUTS } from '@/src/lib/constants';
import { formatCurrency } from '@/src/lib/formatting';
import { useAuth } from '@/src/contexts/AuthContext';
import { getReportViewCount, markReportAsViewed, saveReport } from '@/src/lib/reportStorage';
import { Download, Home, TrendingUp, TrendingDown, Save } from 'lucide-react';

export default function BuyVsRentCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scenarioMode, setScenarioMode] = useState<'normal' | 'roaring20s' | 'lostDecade' | 'crash2008'>('normal');

  const [selectedCountry, setSelectedCountry] = useState('DE');
  const countryConfig = MARKET_DEFAULTS[selectedCountry as keyof typeof MARKET_DEFAULTS];

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Load parameters from URL if present (when viewing saved report)
  useEffect(() => {
    if (searchParams.get('homePrice')) {
      setHomePrice(Number(searchParams.get('homePrice')) || DEFAULT_INPUTS.homePrice);
      setSelectedCountry(searchParams.get('country') || 'DE');
      setDurationYears(Number(searchParams.get('duration')) || DEFAULT_INPUTS.durationYears);
      setHomeAppreciation(Number(searchParams.get('appreciation')) || DEFAULT_INPUTS.homeAppreciationAnnual);
      setDownPayment(Number(searchParams.get('downPayment')) || DEFAULT_INPUTS.downPaymentPercent);
      setMortgageRate(Number(searchParams.get('mortgageRate')) || DEFAULT_INPUTS.mortgageRatePercent);
      setMortgagePeriod(Number(searchParams.get('mortgagePeriod')) || DEFAULT_INPUTS.mortgagePeriodYears);
      setRenovationCost(Number(searchParams.get('renovationCost')) || DEFAULT_INPUTS.renovationCost);
      setHoaMonthly(Number(searchParams.get('hoaMonthly')) || DEFAULT_INPUTS.hoaMonthlyFee);
      setMaintenanceAnnual(Number(searchParams.get('maintenanceAnnual')) || DEFAULT_INPUTS.maintenanceAnnualPercent);
      setMonthlyRent(Number(searchParams.get('rent')) || DEFAULT_INPUTS.monthlyRent);
      setRentGrowth(Number(searchParams.get('rentGrowth')) || DEFAULT_INPUTS.rentGrowthAnnualPercent);
      setInvestmentReturn(Number(searchParams.get('investmentReturn')) || DEFAULT_INPUTS.investmentReturnAnnual);
      setInvestmentTaxRate(Number(searchParams.get('investmentTaxRate')) || 15);
      setMortgageDeduction(Number(searchParams.get('mortgageDeduction')) || DEFAULT_INPUTS.mortgageInterestDeductionPercent);
    }
  }, [searchParams]);

  const [homePrice, setHomePrice] = useState<number>(DEFAULT_INPUTS.homePrice);
  const [durationYears, setDurationYears] = useState<number>(DEFAULT_INPUTS.durationYears);
  const [homeAppreciation, setHomeAppreciation] = useState<number>(
    DEFAULT_INPUTS.homeAppreciationAnnual
  );

  const [downPayment, setDownPayment] = useState<number>(DEFAULT_INPUTS.downPaymentPercent);
  const [mortgageRate, setMortgageRate] = useState<number>(DEFAULT_INPUTS.mortgageRatePercent);
  const [mortgagePeriod, setMortgagePeriod] = useState<number>(DEFAULT_INPUTS.mortgagePeriodYears);
  const [renovationCost, setRenovationCost] = useState<number>(DEFAULT_INPUTS.renovationCost);
  const [hoaMonthly, setHoaMonthly] = useState<number>(DEFAULT_INPUTS.hoaMonthlyFee);
  const [maintenanceAnnual, setMaintenanceAnnual] = useState<number>(
    DEFAULT_INPUTS.maintenanceAnnualPercent
  );
  const [mortgageDeduction, setMortgageDeduction] = useState<number>(
    DEFAULT_INPUTS.mortgageInterestDeductionPercent
  );

  const [buyingCosts, setBuyingCosts] = useState<number>(countryConfig.buyingCosts);
  const [sellingCosts, setSellingCosts] = useState<number>(countryConfig.sellingCosts);
  const [propertyTax, setPropertyTax] = useState<number>(countryConfig.propertyTax);

  const [monthlyRent, setMonthlyRent] = useState<number>(DEFAULT_INPUTS.monthlyRent);
  const [rentGrowth, setRentGrowth] = useState<number>(DEFAULT_INPUTS.rentGrowthAnnualPercent);
  const [investmentReturn, setInvestmentReturn] = useState<number>(
    DEFAULT_INPUTS.investmentReturnAnnual
  );
  const [investmentTaxRate, setInvestmentTaxRate] = useState<number>(15);

  useEffect(() => {
    setBuyingCosts(countryConfig.buyingCosts);
    setSellingCosts(countryConfig.sellingCosts);
    setPropertyTax(countryConfig.propertyTax);
  }, [selectedCountry, countryConfig]);

  // Apply scenario adjustments based on scenario mode
  const getScenarioAdjustedInput = () => {
    let adjustedInput = { ...calculatorInput };
    
    switch (scenarioMode) {
      case 'roaring20s':
        // High S&P growth (15%), Low Inflation (1%)
        adjustedInput.investmentReturnAnnual = 15;
        adjustedInput.rentGrowthAnnualPercent = 1;
        adjustedInput.homeAppreciationAnnual = 5; // Higher home appreciation
        break;
      case 'lostDecade':
        // Flat Stocks (0%), 5% Inflation
        adjustedInput.investmentReturnAnnual = 0;
        adjustedInput.rentGrowthAnnualPercent = 5;
        adjustedInput.homeAppreciationAnnual = 1;
        break;
      case 'crash2008':
        // -30% Property, -50% Stocks
        adjustedInput.investmentReturnAnnual = -50;
        adjustedInput.homeAppreciationAnnual = -30;
        adjustedInput.rentGrowthAnnualPercent = 3;
        break;
    }
    
    return adjustedInput;
  };

  const calculatorInput: BuyVsRentInput = {
    homePrice,
    downPaymentPercent: downPayment,
    mortgageRatePercent: mortgageRate,
    mortgagePeriodYears: mortgagePeriod,
    closingCostsPercent: buyingCosts,
    sellingCostsPercent: sellingCosts,
    monthlyRent,
    rentGrowthAnnualPercent: rentGrowth,
    homeAppreciationAnnual: homeAppreciation,
    maintenanceAnnualPercent: maintenanceAnnual,
    hoaMonthlyFee: hoaMonthly,
    durationYears,
    investmentReturnAnnual: investmentReturn,
    mortgageInterestDeductionPercent: mortgageDeduction,
    renovationCost,
    propertyTaxAnnualPercent: propertyTax,
    investmentTaxRatePercent: investmentTaxRate,
  };

  const result = useBuyVsRent(getScenarioAdjustedInput());
  const chartData = result.yearlyData;

  const isBuyingBetter = result.finalBuyingNetWorth > result.finalRentingNetWorth;
  const difference = Math.abs(result.difference);

  const handleGenerateReport = () => {
    const reportCount = getReportViewCount();
    if (reportCount >= 1 && !user) {
      setShowAuthModal(true);
      return;
    }

    markReportAsViewed(`report-${reportCount + 1}`);

    const params = new URLSearchParams({
      country: selectedCountry,
      homePrice: homePrice.toString(),
      duration: durationYears.toString(),
      appreciation: homeAppreciation.toString(),
      downPayment: downPayment.toString(),
      mortgageRate: mortgageRate.toString(),
      mortgagePeriod: mortgagePeriod.toString(),
      closingCosts: buyingCosts.toString(),
      renovationCost: renovationCost.toString(),
      hoaMonthly: hoaMonthly.toString(),
      maintenanceAnnual: maintenanceAnnual.toString(),
      sellingCosts: sellingCosts.toString(),
      mortgageDeduction: mortgageDeduction.toString(),
      rent: monthlyRent.toString(),
      rentGrowth: rentGrowth.toString(),
      investmentReturn: investmentReturn.toString(),
      investmentTaxRate: investmentTaxRate.toString(),
    });

    router.push(`/report?${params.toString()}`);
  };

  const handleSaveReport = async () => {
    if (!user || !reportName.trim()) {
      alert('Please log in and enter a report name');
      return;
    }

    setSaving(true);
    try {
      await saveReport(calculatorInput, result, reportName);
      alert('Report saved successfully!');
      setShowSaveModal(false);
      setReportName('');
    } catch (error) {
      alert('Failed to save report: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Buy vs Rent Calculator</h1>
        <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-12`}>
          Adjust the sliders to compare the financial outcomes of buying vs renting
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: INPUTS */}
          <div className="space-y-8">
            {/* Country Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4">Select Country/Region</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
                  } focus:border-indigo-500 focus:outline-none`}
              >
                {Object.entries(MARKET_DEFAULTS).map(([code, config]) => (
                  <option key={code} value={code}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Inputs */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
              }`}>
              <h3 className="text-lg font-semibold mb-6">Property Details</h3>
              <div className="space-y-6">
                <SliderField label="Home Price" value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={10000} unit="€" theme={theme} />
                <SliderField label="Duration" value={durationYears} onChange={setDurationYears} min={1} max={50} step={1} unit="years" theme={theme} />
                <SliderField label="Annual Appreciation" value={homeAppreciation} onChange={setHomeAppreciation} min={-5} max={10} step={0.1} unit="%" theme={theme} />
              </div>
            </div>

            {/* Buying Costs */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
              }`}>
              <h3 className="text-lg font-semibold mb-6">Buying Costs</h3>
              <div className="space-y-6">
                <SliderField label="Down Payment" value={downPayment} onChange={setDownPayment} min={5} max={100} step={1} unit="%" theme={theme} />
                <SliderField label="Mortgage Rate" value={mortgageRate} onChange={setMortgageRate} min={0.5} max={12} step={0.1} unit="%" theme={theme} />
                <SliderField label="Mortgage Period" value={mortgagePeriod} onChange={setMortgagePeriod} min={5} max={50} step={1} unit="years" theme={theme} />
                <SliderField label="Annual Maintenance" value={maintenanceAnnual} onChange={setMaintenanceAnnual} min={0.2} max={5} step={0.1} unit="%" theme={theme} />
                <SliderField label="Monthly HOA" value={hoaMonthly} onChange={setHoaMonthly} min={0} max={1000} step={50} unit="€" theme={theme} />
                <SliderField label="Renovation Cost" value={renovationCost} onChange={setRenovationCost} min={0} max={200000} step={5000} unit="€" theme={theme} />
                <SliderField label="Mortgage Interest Deduction" value={mortgageDeduction} onChange={setMortgageDeduction} min={0} max={100} step={5} unit="%" theme={theme} />
              </div>
            </div>

            {/* Renting Details */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
              }`}>
              <h3 className="text-lg font-semibold mb-6">Renting Details</h3>
              <div className="space-y-6">
                <SliderField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={500} max={10000} step={100} unit="€" theme={theme} />
                <SliderField label="Annual Rent Growth" value={rentGrowth} onChange={setRentGrowth} min={0} max={10} step={0.1} unit="%" theme={theme} />
                <SliderField label="Investment Return" value={investmentReturn} onChange={setInvestmentReturn} min={0} max={20} step={0.5} unit="%" theme={theme} />
                <SliderField label="Investment Tax Rate" value={investmentTaxRate} onChange={setInvestmentTaxRate} min={0} max={50} step={1} unit="%" theme={theme} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VISUALIZATION */}
          <div className="space-y-8">
            {/* Verdict Card */}
            <div className={`p-8 rounded-xl border-2 ${
              isBuyingBetter
                ? 'border-green-500 bg-gradient-to-br from-green-900 to-green-800'
                : 'border-blue-500 bg-gradient-to-br from-blue-900 to-blue-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">The Verdict</h2>
                {isBuyingBetter ? (
                  <TrendingUp size={40} className="text-green-400" />
                ) : (
                  <TrendingDown size={40} className="text-blue-400" />
                )}
              </div>
              <p className={`text-lg font-semibold mb-6 ${
                isBuyingBetter ? 'text-green-200' : 'text-blue-200'
              }`}>
                {isBuyingBetter
                  ? '🏠 Buying is better for you'
                  : '🔑 Renting is better for you'}
              </p>
              <div className="text-4xl font-bold text-white mb-2">
                {formatCurrency(difference)}
              </div>
              <p className={`text-sm ${
                isBuyingBetter ? 'text-green-300' : 'text-blue-300'
              }`}>
                Net worth difference after {durationYears} years
              </p>
            </div>

            {/* Chart */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
              }`}>
              <h3 className="text-xl font-bold mb-4">Net Worth Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBuying" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRenting" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#475569' : '#e2e8f0'} />
                  <XAxis dataKey="year" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                  <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                      border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        return [formatCurrency(value), ''];
                      }
                      return [value, ''];
                    }}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="buyingNetWorth" stroke="#10b981" fillOpacity={1} fill="url(#colorBuying)" name="Buying Path" />
                  <Area type="monotone" dataKey="rentingNetWorth" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRenting)" name="Renting Path" />
                </AreaChart>
              </ResponsiveContainer>
              
              {/* Scenario Slider */}
              <div className="mt-8 space-y-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Stress Test Scenario</h4>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setScenarioMode('normal')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                      scenarioMode === 'normal'
                        ? theme === 'dark'
                          ? 'bg-slate-600 text-white'
                          : 'bg-slate-400 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
                    }`}
                  >
                    Normal Market
                  </button>
                  <button
                    onClick={() => setScenarioMode('roaring20s')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                      scenarioMode === 'roaring20s'
                        ? theme === 'dark'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-500 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
                    }`}
                  >
                    🚀 Roaring 20s
                  </button>
                  <button
                    onClick={() => setScenarioMode('lostDecade')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                      scenarioMode === 'lostDecade'
                        ? theme === 'dark'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-yellow-500 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
                    }`}
                  >
                    📉 Lost Decade
                  </button>
                  <button
                    onClick={() => setScenarioMode('crash2008')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                      scenarioMode === 'crash2008'
                        ? theme === 'dark'
                          ? 'bg-red-600 text-white'
                          : 'bg-red-500 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
                    }`}
                  >
                    💥 2008 Crash
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {scenarioMode === 'normal' && 'Current market conditions with baseline assumptions'}
                  {scenarioMode === 'roaring20s' && 'Bull market: 15% stocks, 5% home appreciation, 1% rent growth'}
                  {scenarioMode === 'lostDecade' && 'Stagnant market: 0% stocks, 1% home appreciation, 5% rent growth'}
                  {scenarioMode === 'crash2008' && 'Market crash: -50% stocks, -30% property values, 3% rent growth'}
                </p>
              </div>
            </div>

            {/* Detailed Buying Path */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-700'
              : 'bg-gradient-to-br from-green-100 to-green-50 border-green-300'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-green-100' : 'text-green-900'}`}>
                🏠 Buying Path
              </h3>
              <div className="space-y-2 text-sm">
                <div className={`flex justify-between ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
                  <span>Down Payment</span>
                  <span className="font-semibold">{formatCurrency((homePrice * downPayment) / 100)}</span>
                </div>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
                  <span>Closing Costs</span>
                  <span className="font-semibold">{formatCurrency((homePrice * countryConfig.buyingCosts) / 100)}</span>
                </div>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
                  <span>Renovation</span>
                  <span className="font-semibold">{formatCurrency(renovationCost)}</span>
                </div>
                <div className={`border-t pt-3 mt-3 ${theme === 'dark' ? 'border-green-700' : 'border-green-200'}`}>
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-green-100' : 'text-green-900'}`}>
                    <span className="font-medium">Total Initial</span>
                    <span className="font-bold">{formatCurrency((homePrice * downPayment) / 100 + (homePrice * countryConfig.buyingCosts) / 100 + renovationCost)}</span>
                  </div>
                </div>
                <div className={`border-t pt-2 mt-2 ${theme === 'dark' ? 'border-green-700' : 'border-green-200'}`}>
                  <div className={`flex justify-between mb-1 ${theme === 'dark' ? 'text-green-100' : 'text-green-900'}`}>
                    <span className="font-medium">Total {durationYears}Y Spending</span>
                    <span className="font-bold text-sm">{formatCurrency(result.totalBuyingCosts)}</span>
                  </div>
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-green-100' : 'text-green-900'}`}>
                    <span className="font-medium">Final Net Worth</span>
                    <span className="font-bold text-sm text-green-300">{formatCurrency(result.finalBuyingNetWorth)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Renting Path */}
            <div className={`p-6 rounded-lg border ${theme === 'dark'
              ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700'
              : 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}`}>
                💰 Renting + Investing Path
              </h3>
              <div className="space-y-2 text-sm">
                <div className={`flex justify-between ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                  <span>Initial Investment</span>
                  <span className="font-semibold">{formatCurrency((homePrice * downPayment) / 100 + (homePrice * countryConfig.buyingCosts) / 100 + renovationCost)}</span>
                </div>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                  <span>First Year Monthly Rent</span>
                  <span className="font-semibold">{formatCurrency(monthlyRent)}</span>
                </div>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                  <span>Rent Growth Rate</span>
                  <span className="font-semibold">{rentGrowth.toFixed(2)}%</span>
                </div>
                <div className={`border-t pt-3 mt-3 ${theme === 'dark' ? 'border-blue-700' : 'border-blue-200'}`}>
                  <div className={`flex justify-between mb-1 ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}`}>
                    <span className="font-medium">Total {durationYears}Y Rent Spent</span>
                    <span className="font-bold text-sm">{formatCurrency(result.totalRentingCosts)}</span>
                  </div>
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}`}>
                    <span className="font-medium">Final Net Worth</span>
                    <span className="font-bold text-sm text-blue-300">{formatCurrency(result.finalRentingNetWorth)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGenerateReport}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${
                  isBuyingBetter
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Download size={20} />
                Generate Detailed Report
              </button>
              {user && (
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="w-full py-3 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save This Calculation
                </button>
              )}
            </div>

            {/* Save Report Modal */}
            {showSaveModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`rounded-2xl shadow-2xl max-w-md w-full p-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                  <h2 className="text-2xl font-bold mb-4">Save Calculation</h2>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter a name for this calculation (e.g., 'Berlin 2024')"
                    className={`w-full px-4 py-2 rounded-lg border mb-4 ${theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-slate-300'
                    } focus:border-blue-500 focus:outline-none`}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowSaveModal(false);
                        setReportName('');
                      }}
                      disabled={saving}
                      className="flex-1 px-4 py-2 rounded-lg border border-slate-400 hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveReport}
                      disabled={saving || !reportName.trim()}
                      className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}
