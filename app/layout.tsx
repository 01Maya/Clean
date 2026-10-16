import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: "%s | CLEAN" },
  description: siteDescription,
  keywords: ["home cleaning", "office cleaning", "deep cleaning", "eco-friendly cleaning", "move-in cleaning"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "/",
    siteName,
    images: [
      {
        url: "/images/hero.jpg",
        alt: "Eco-friendly cleaning supplies on a soft mint background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#c3e5c4", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
