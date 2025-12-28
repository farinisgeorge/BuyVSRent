import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Header } from "@/src/components/Header";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stealth Investor - Investment Tools & Financial Analysis",
  description: "Smart financial analysis tools for savvy investors. Compare buying vs renting, analyze investment opportunities, and make data-driven decisions.",
  keywords: ["investment", "buy vs rent", "financial analysis", "property investment", "stealth investor"],
  openGraph: {
    title: "Stealth Investor - Investment Tools & Financial Analysis",
    description: "Smart financial analysis tools for savvy investors. Compare buying vs renting, analyze investment opportunities.",
    url: "https://stealthinvestor.com",
    type: "website",
    images: [
      {
        url: "https://stealthinvestor.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stealth Investor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stealth Investor",
    description: "Investment tools for smart financial decisions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
