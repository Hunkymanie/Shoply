import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnalyticsProvider, AnalyticsScript } from "@/contexts/AnalyticsContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { NewsletterModalProvider } from "@/components/NewsletterModal";
import { DemoHelper } from "@/components/DemoHelper";

export const metadata: Metadata = {
  title: {
    default: "Shoply - Fashion Forward Style",
    template: "%s | Shoply",
  },
  description: "Discover the latest fashion trends and timeless pieces. Curated clothing, shoes, and accessories for the modern wardrobe.",
  keywords: ["fashion", "clothing", "shoes", "accessories", "style", "trends", "online shopping", "luxury fashion"],
  authors: [{ name: "Shoply Team" }],
  creator: "Shoply",
  publisher: "Shoply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL("https://shoply.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shoply.com",
    title: "Shoply - Fashion Forward Style",
    description: "Discover the latest fashion trends and timeless pieces. Curated clothing, shoes, and accessories.",
    siteName: "Shoply",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shoply - Fashion Forward Style",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoply - Fashion Forward Style",
    description: "Discover the latest fashion trends and timeless pieces.",
    images: ["/og-image.jpg"],
    creator: "@shoply",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBanner />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <NewsletterModalProvider />
      <DemoHelper />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AnalyticsScript />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AnalyticsProvider>
          <CurrencyProvider>
            <CartProvider>
              <AuthProvider>
                <LayoutContent>
                  {children}
                </LayoutContent>
              </AuthProvider>
            </CartProvider>
          </CurrencyProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
