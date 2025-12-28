import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stealth Investor - Smart Financial Tools for Investors',
  description: 'Access powerful investment analysis tools. Start with our Buy vs Rent calculator.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          The Stealth Buy-vs-Rent Index
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Make smarter real estate decisions. Our advanced calculator analyzes buying vs renting scenarios with precision.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
        >
          Try Calculator Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
            <p className="text-slate-300">
              Compare buying and renting scenarios with detailed financial projections.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Data is Safe</h3>
            <p className="text-slate-300">
              All calculations are done locally. We don't store personal information.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-slate-300">
              Get detailed analysis and visualizations instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Smart Decision?</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Start your analysis today and get actionable insights for your real estate investment.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
        >
          Open Calculator
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Stealth Investor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
