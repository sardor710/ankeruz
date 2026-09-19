import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// MontForAnker is the only family the target site actually paints. It declares
// italic faces too, but they never load there, so we ship the five upright weights.
const mont = localFont({
  variable: "--font-mont",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  src: [
    { path: "../../public/fonts/MontForAnker-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/MontForAnker-600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/MontForAnker-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/MontForAnker-800.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/MontForAnker-900.ttf", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ankernordics.com"),
  title: "Anker Nordics | Official Site for Anker in the Nordics",
  description:
    "Discover Anker and shop chargers, batteries, hubs, docks, portable power stations, conferencing gear, and more",
  openGraph: {
    title: "Anker Nordics | Official Site for Anker in the Nordics",
    description:
      "Shop exclusive deals on Anker, soundcore, and eufy. Discover savings on chargers, speakers, projectors, robot vacuums and more.",
    url: "https://www.ankernordics.com",
    siteName: "ankernordics",
    type: "website",
  },
  manifest: "/seo/site.webmanifest",
  icons: {
    icon: "/seo/favicon.ico",
    apple: "/seo/apple-touch-icon.png",
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
