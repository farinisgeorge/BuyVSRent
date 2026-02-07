'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Lock, Zap } from 'lucide-react';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        color: isDark ? '#ffffff' : '#0f172a',
      }}
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          The Investor's Buy-vs-Rent Index
        </h1>
        <p
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
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
          <div
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
              borderColor: isDark ? '#3f3f46' : '#e2e8f0',
            }}
            className="p-8 rounded-lg border"
          >
            <div
              style={{ backgroundColor: isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)' }}
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            >
              <TrendingUp className="w-6 h-6" style={{ color: isDark ? '#a5f3fc' : '#0369a1' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
            <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
              Compare buying and renting scenarios with detailed financial projections.
            </p>
          </div>

          <div
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
              borderColor: isDark ? '#3f3f46' : '#e2e8f0',
            }}
            className="p-8 rounded-lg border"
          >
            <div
              style={{ backgroundColor: isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)' }}
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            >
              <Lock className="w-6 h-6" style={{ color: isDark ? '#a5f3fc' : '#0369a1' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Data is Safe</h3>
            <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
              All calculations are done locally. We don't store personal information.
            </p>
          </div>

          <div
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
              borderColor: isDark ? '#3f3f46' : '#e2e8f0',
            }}
            className="p-8 rounded-lg border"
          >
            <div
              style={{ backgroundColor: isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)' }}
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            >
              <Zap className="w-6 h-6" style={{ color: isDark ? '#a5f3fc' : '#0369a1' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
              Get detailed analysis and visualizations instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Smart Decision?</h2>
        <p
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          className="mb-8 max-w-2xl mx-auto"
        >
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
      <footer
        style={{
          borderColor: isDark ? '#3f3f46' : '#e2e8f0',
          color: isDark ? '#9ca3af' : '#6b7280',
        }}
        className="border-t mt-20 py-12"
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2024 Investor's Toolbox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
