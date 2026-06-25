import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const siteUrl = "https://everythingmustgo.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EMG | Everything Must Go Online - Buy & Sell Marketplace in Kuwait & GCC",
    template: "%s | EMG - Everything Must Go Online",
  },
  description:
    "EMG (Everything Must Go Online) is Kuwait & the GCC's fastest classifieds marketplace. Buy, sell, advertise and grow your business online - electronics, cars, real estate, jobs and more.",
  keywords: [
    "EMG",
    "Everything Must Go Online",
    "classifieds Kuwait",
    "buy and sell Kuwait",
    "online marketplace GCC",
    "dubizzle alternative",
    "OpenSooq alternative",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "EMG - Everything Must Go Online",
    title: "EMG | Everything Must Go Online",
    description:
      "Buy, sell, advertise, and grow your business online across Kuwait & the GCC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMG | Everything Must Go Online",
    description: "Buy, sell, advertise, and grow your business online.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Everything Must Go Online (EMG)",
    alternateName: "EMG",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Kuwait & the GCC's classifieds marketplace to buy, sell, advertise, and grow a business online.",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuwait City",
      addressCountry: "KW",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
