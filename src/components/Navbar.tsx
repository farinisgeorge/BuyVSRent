import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-400">
            <span>🕵️</span>
            <span>Stealth Investor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/tools" className="hover:text-blue-400 transition">Tools</Link>
            <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
            <Link href="/blog" className="hover:text-blue-400 transition">Blog</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-slate-800 rounded">Home</Link>
            <Link href="/tools" className="block px-4 py-2 hover:bg-slate-800 rounded">Tools</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-slate-800 rounded">About</Link>
            <Link href="/pricing" className="block px-4 py-2 hover:bg-slate-800 rounded">Pricing</Link>
            <Link href="/blog" className="block px-4 py-2 hover:bg-slate-800 rounded">Blog</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-slate-800 rounded">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
