import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Montserrat } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animations/PageTransition";
import { RouteCurtain } from "@/components/animations/RouteCurtain";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CursorProvider } from "@/components/providers/CursorContext";
import { TransitionLabelProvider } from "@/components/providers/TransitionLabelContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const PRELOADER_SKIP_SCRIPT = `try{if(sessionStorage.getItem('jf-visited')){document.documentElement.classList.add('preloader-skip');}}catch(e){}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SKIP_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <MotionConfig reducedMotion="user">
          <CursorProvider>
            <TransitionLabelProvider>
              <LoadingScreen />
              <SmoothScroll />
              <CustomCursor />
              <RouteCurtain />
              <Nav />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </TransitionLabelProvider>
          </CursorProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
