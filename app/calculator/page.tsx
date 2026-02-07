import { Metadata } from 'next';
import { Suspense } from 'react';
import BuyVsRentCalculator from '@/app/calculator-content';

export const metadata: Metadata = {
  title: "The Investor's Buy-vs-Rent Index Calculator",
  description: 'Comprehensive financial analysis tool for comparing buying versus renting properties with detailed projections.',
};

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
      <BuyVsRentCalculator />
    </Suspense>
  );
}
