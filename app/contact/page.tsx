import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Stealth Investor',
  description: 'Get in touch with the Stealth Investor team. We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Email</h3>
                <a href="mailto:hello@stealthinvestor.com" className="text-slate-300 hover:text-white">
                  hello@stealthinvestor.com
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Phone</h3>
                <p className="text-slate-300">[Contact coming soon]</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Address</h3>
                <p className="text-slate-300">[Address coming soon]</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-300 hover:text-blue-400">Twitter</a>
                  <a href="#" className="text-slate-300 hover:text-blue-400">LinkedIn</a>
                  <a href="#" className="text-slate-300 hover:text-blue-400">Instagram</a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Business Hours</h3>
                <p className="text-slate-300">Monday - Friday: 9am - 5pm EST</p>
                <p className="text-slate-300">Weekend: Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
