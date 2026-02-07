'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/src/contexts/ThemeContext';


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    // { label: 'Home', href: '/' },
    { label: 'Calculator', href: '/calculator' },
    // { label: 'Tools', href: '/tools' },
    // { label: 'About', href: '/about' },
    // { label: 'Pricing', href: '/pricing' },
    // { label: 'Blog', href: '/blog' },
    // { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header 
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#3f3f46' : '#e2e8f0',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
        className="sticky top-0 z-40 border-b shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/calculator" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="font-bold text-xl hidden sm:inline"
              >
                Investor's Toolbox
              </span>
              <span 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="font-bold text-lg sm:hidden"
              >
                SI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    backgroundColor: isActive(item.href) ? '#4f46e5' : 'transparent',
                    color: isActive(item.href) 
                      ? '#ffffff' 
                      : isDark ? '#cbd5e1' : '#475569',
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:text-white"
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = isDark ? '#3f3f46' : '#f1f5f9';
                      e.currentTarget.style.color = isDark ? '#ffffff' : '#1e293b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                style={{
                  color: isDark ? '#cbd5e1' : '#78716c',
                }}
                className="p-2 rounded-lg transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#3f3f46' : '#f1f5f9';
                  e.currentTarget.style.color = isDark ? '#ffffff' : '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDark ? '#cbd5e1' : '#78716c';
                }}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: isDark ? '#cbd5e1' : '#78716c',
              }}
              className="md:hidden p-2 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav 
              style={{
                borderColor: isDark ? '#3f3f46' : '#e2e8f0',
              }}
              className="md:hidden pb-4 space-y-1 border-t pt-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    backgroundColor: isActive(item.href) ? '#4f46e5' : 'transparent',
                    color: isActive(item.href) 
                      ? '#ffffff' 
                      : isDark ? '#cbd5e1' : '#475569',
                  }}
                  className="block px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                style={{
                  backgroundColor: isDark ? '#3f3f46' : '#f1f5f9',
                  color: isDark ? '#cbd5e1' : '#475569',
                }}
                className="block w-full mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
