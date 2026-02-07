import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About - Investor's Toolbox",
  description: "Learn about Investor's Toolbox and our mission to provide transparent financial analysis tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Investor's Toolbox</h1>
        
        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
            <p>
              [Content coming soon - Tell your story about why you built Investor's Toolbox and what problem you're solving]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Values</h2>
            <ul className="space-y-3">
              <li>📊 <strong>Transparency:</strong> [Value description]</li>
              <li>🔒 <strong>Privacy:</strong> [Value description]</li>
              <li>⚡ <strong>Accuracy:</strong> [Value description]</li>
              <li>🤝 <strong>Accessibility:</strong> [Value description]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Team</h2>
            <p>
              [Content coming soon - Information about your team and background]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Get in Touch</h2>
            <p>
              Have questions? <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact us</a> - we'd love to hear from you.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
