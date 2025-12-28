import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Stealth Investor',
  description: 'Articles and insights on investment analysis, real estate, and financial planning.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Stealth Investor Blog</h1>
        <p className="text-slate-300 mb-12">
          Insights, tips, and analysis on investing, real estate, and financial planning.
        </p>

        <div className="space-y-8">
          {/* Blog Post 1 */}
          <article className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">[Article Title 1]</h2>
              <span className="text-slate-400 text-sm">Coming Soon</span>
            </div>
            <p className="text-slate-400 mb-4">January 1, 2024</p>
            <p className="text-slate-300 mb-4">
              [Article excerpt - A brief preview of the article content that will help readers decide if they want to read more]
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">
              Read More →
            </a>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">[Article Title 2]</h2>
              <span className="text-slate-400 text-sm">Coming Soon</span>
            </div>
            <p className="text-slate-400 mb-4">December 15, 2023</p>
            <p className="text-slate-300 mb-4">
              [Article excerpt - A brief preview of the article content that will help readers decide if they want to read more]
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">
              Read More →
            </a>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">[Article Title 3]</h2>
              <span className="text-slate-400 text-sm">Coming Soon</span>
            </div>
            <p className="text-slate-400 mb-4">December 1, 2023</p>
            <p className="text-slate-300 mb-4">
              [Article excerpt - A brief preview of the article content that will help readers decide if they want to read more]
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">
              Read More →
            </a>
          </article>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-300">
            More articles coming soon. <a href="#" className="text-blue-400 hover:text-blue-300">Subscribe</a> to get notified.
          </p>
        </div>
      </div>
    </div>
  );
}
