import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import SciFiGrid from "@/components/sci-fi-grid";

// Fuentes cargadas de forma estática
const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Zerxio - Hosting Web de Alto Rendimiento",
    template: "%s | Zerxio"
  },
  description: "Hosting Web profesional que acelera el éxito de tu negocio con máxima velocidad, seguridad y soporte técnico 24/7.",
  keywords: ["hosting", "web hosting", "dominio", "servidores", "hosting web argentina", "hosting rápido", "ssl", "email profesional"],
  authors: [{ name: "Zerxio" }],
  creator: "Zerxio",
  publisher: "Zerxio",
  metadataBase: new URL('https://zerxio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Zerxio - Hosting Web de Alto Rendimiento",
    description: "Hosting Web profesional que acelera el éxito de tu negocio con máxima velocidad, seguridad y soporte técnico 24/7.",
    url: 'https://zerxio.com',
    siteName: 'Zerxio',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zerxio Hosting Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zerxio - Hosting Web de Alto Rendimiento',
    description: 'Hosting Web profesional que acelera el éxito de tu negocio',
    images: ['/twitter-image.jpg'],
    creator: '@zerxio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agrega aquí tus códigos de verificación de Google Search Console, Bing, etc.
    // google: 'google-site-verification=your-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning={true} className="relative">
        <AnimatedBackground />
        <div className="site">
          <Header />
          {children}
          <Footer />
        </div>
        <SciFiGrid />
      </body>
    </html>
  );
}
