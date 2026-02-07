import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tools - Investor's Toolbox",
  description: 'Investment analysis tools including our Buy vs Rent Index calculator.',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Investment Tools</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buy vs Rent Index */}
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <h2 className="text-2xl font-bold mb-4">The Investor's Buy-vs-Rent Index</h2>
            <p className="text-slate-300 mb-6">
              Comprehensive financial analysis tool for comparing buying versus renting properties. 
              Get detailed year-by-year projections, tax implications analysis, and amortization schedules.
            </p>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li>✓ Year-by-year investment comparison</li>
              <li>✓ Amortization schedule with interest breakdown</li>
              <li>✓ Tax implications analysis</li>
              <li>✓ Save and share reports</li>
            </ul>
            <a
              href="/calculator"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Launch Calculator →
            </a>
          </div>

          {/* More Tools Coming Soon */}
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 opacity-50">
            <h2 className="text-2xl font-bold mb-4">More Tools Coming Soon</h2>
            <p className="text-slate-300 mb-6">
              We're working on additional investment analysis tools to help you make smarter financial decisions.
            </p>
            <button disabled className="bg-slate-700 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
