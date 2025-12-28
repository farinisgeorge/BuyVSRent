import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stealth Investor - Smart Financial Tools for Investors',
  description: 'Access powerful investment analysis tools. Start with our Buy vs Rent calculator.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Smart Financial Tools for Savvy Investors
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Make data-driven investment decisions with our suite of professional financial analysis tools.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
          >
            <span>Explore Tools</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <TrendingUp className="mb-4 text-blue-400" size={32} />
            <h3 className="text-xl font-semibold mb-4">Buy vs Rent Analysis</h3>
            <p className="text-slate-300">
              Compare the financial impact of buying versus renting with detailed year-by-year projections.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <Lock className="mb-4 text-blue-400" size={32} />
            <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
            <p className="text-slate-300">
              Your data is encrypted and never shared. Complete privacy for your financial analysis.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <Zap className="mb-4 text-blue-400" size={32} />
            <h3 className="text-xl font-semibold mb-4">Instant Results</h3>
            <p className="text-slate-300">
              Get instant calculations and detailed reports in seconds. No waiting required.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to analyze your investment options?</h2>
          <p className="text-slate-300 mb-8">
            Start with our Buy vs Rent Index - first calculation is free.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            <span>Get Started Free</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
