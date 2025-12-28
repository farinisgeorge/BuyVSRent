import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Stealth Investor',
  description: 'Simple, transparent pricing for Stealth Investor tools. Free and paid plans available.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Simple, Transparent Pricing</h1>
        <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
          Start free. Upgrade only if you need more advanced features.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-3xl font-bold mb-6">$0<span className="text-sm text-slate-400">/month</span></p>
            
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ [Feature 1]</li>
              <li>✓ [Feature 2]</li>
              <li>✓ [Feature 3]</li>
              <li>✗ [Feature 4]</li>
            </ul>
            
            <button className="w-full bg-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition">
              Get Started
            </button>
          </div>

          {/* Pro Plan (Recommended) */}
          <div className="bg-blue-900 p-8 rounded-lg border-2 border-blue-500 relative">
            <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-semibold">
              RECOMMENDED
            </div>
            <h2 className="text-2xl font-bold mb-4 mt-4">Pro</h2>
            <p className="text-3xl font-bold mb-6">$9<span className="text-sm text-slate-400">/month</span></p>
            
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ [Feature 1]</li>
              <li>✓ [Feature 2]</li>
              <li>✓ [Feature 3]</li>
              <li>✓ [Feature 4]</li>
            </ul>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
            <p className="text-3xl font-bold mb-6">Custom</p>
            
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ [Feature 1]</li>
              <li>✓ [Feature 2]</li>
              <li>✓ [Feature 3]</li>
              <li>✓ [Feature 4]</li>
            </ul>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-16 text-center text-slate-300">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <p>[FAQs content coming soon]</p>
        </div>
      </div>
    </div>
  );
}
