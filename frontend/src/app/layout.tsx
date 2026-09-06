import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Inter } from "next/font/google";
import AIChatWidgetWrapper from "@/components/ai/AIChatWidgetWrapper";
import MobileBottomNav from "@/components/MobileBottomNav";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amudhasurabiy Organics (Amudhasurabi) | Blovit Natural Malt Drinks",
  description: "Amudhasurabiy Organics (also searched as Amudhasurabi, Amuthasurabi) brings you Blovit — 100% natural malt health drinks made in Tamil Nadu.",
  metadataBase: new URL("https://amudhasurabiy.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Amudhasurabiy Organics (Amudhasurabi) | Blovit Natural Malt Drinks",
    description: "Amudhasurabiy Organics (also searched as Amudhasurabi, Amuthasurabi) brings you Blovit — 100% natural malt health drinks made in Tamil Nadu.",
    url: "https://amudhasurabiy.com",
    siteName: "Amudhasurabiy Organics",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Amudhasurabiy Organics Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amudhasurabiy Organics | Pure Nutrition. Naturally Crafted.",
    description: "Official Digital Headquarters of Amudhasurabiy Organics.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-cream text-charcoal pb-16 md:pb-0">
        {children}
        <AIChatWidgetWrapper />
        <MobileBottomNav />
        {/* Service Worker registration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('ServiceWorker registered with scope: ', reg.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
