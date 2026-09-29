import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LightboxProvider from "@/components/LightboxProvider";
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
  title: "Website Portofolio Rifqi",
  description:
    "Portfolio of Qi, a freelance multimedia professional with an Informatics background. Live event production, video editing, AI agents, and creative multimedia work.",
  applicationName: "Rifqi Portofolio",
  authors: [{ name: "Muhammad Rifqi Asy'ari" }],
  keywords: [
    "Qi",
    "multimedia",
    "video editor",
    "live event",
    "AI agents",
    "Informatika",
    "portfolio",
  ],
  openGraph: {
    title: "Website Portofolio Rifqi",
    description:
      "Portfolio of Qi, a freelance multimedia professional with an Informatics background. Live event production, video editing, and AI agent development.",
    siteName: "Rifqi Portofolio",
    locale: "id_ID",
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <LightboxProvider>{children}</LightboxProvider>
      </body>
    </html>
  );
}
