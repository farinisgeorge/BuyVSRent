import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { ThemeWrapper } from "@/src/components/ThemeWrapper";
import { Header } from "@/src/components/Header";
import { Analytics } from '@vercel/analytics/next';
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
  title: "Investor's Toolbox - Investment Tools & Financial Analysis",
  description: "Smart financial analysis tools for savvy investors. Compare buying vs renting, analyze investment opportunities, and make data-driven decisions.",
  keywords: ["investment", "buy vs rent", "financial analysis", "property investment", "investors toolbox"],
  openGraph: {
    title: "Investor's Toolbox - Investment Tools & Financial Analysis",
    description: "Smart financial analysis tools for savvy investors. Compare buying vs renting, analyze investment opportunities.",
    url: "https://investorstoolbox.com",
    type: "website",
    images: [
      {
        url: "https://investorstoolbox.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Investor's Toolbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor's Toolbox",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <ThemeProvider>
          <ThemeWrapper>
            <AuthProvider>
              <Header />
              {children}
            </AuthProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
