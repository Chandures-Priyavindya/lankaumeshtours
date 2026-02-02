import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google"; // Use Inter instead of Geist for better compatibility
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages | Best Travel & Holiday Deals - Lanka Umesh Tours",
  description: "Discover the best Sri Lanka tour packages for unforgettable holidays. Customizable itineraries, expert guides, and great deals on culture, nature, and beach tours across Sri Lanka.",
  keywords: ["Sri Lanka tour packages", "travel Sri Lanka", "Sri Lanka holidays", "custom Sri Lanka tours", "tour operators Sri Lanka", "best Sri Lanka travel deals", "Sri Lanka vacation packages", "Lanka Umesh Tours"],
  authors: [{ name: "Lanka Umesh Tours Team" }],
  openGraph: {
    
    
    url: "https://www.lankaumeshtours.com/", // **MUST UPDATE THIS**
    siteName: "Lanka Umesh Tours",
    type: "website",
    // Consider adding an image property for Open Graph to display an appealing picture of Sri Lanka
    // image: "URL_TO_A_HIGH_QUALITY_SRI_LANKA_IMAGE", 
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Tour Packages | Best Travel & Holiday Deals - Lanka Umesh Tours",
    description: "Discover the best Sri Lanka tour packages for unforgettable holidays. Customizable itineraries, expert guides, and great deals on culture, nature, and beach tours across Sri Lanka.",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
