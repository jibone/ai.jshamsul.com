import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.css";

const iaWriterDuo = localFont({
  src: "../fonts/iAWriterDuoV.ttf",
  variable: "--font-iawriter-duo",
});

const iaWriterDuoItalic = localFont({
  src: "../fonts/iAWriterDuoV-Italic.ttf",
  variable: "--font-iawriter-duo-italic",
});

const iaWriterQuattro = localFont({
  src: "../fonts/iAWriterQuattroV.ttf",
  variable: "--font-iawriter-quattro",
});

const iaWriterQuattroItelic = localFont({
  src: "../fonts/iAWriterQuattroV-Italic.ttf",
  variable: "--font-iawriter-quattro-italic",
});

const iaWriterMono = localFont({
  src: "../fonts/iAWriterMonoV.ttf",
  variable: "--font-iawriter-mono",
});

const iaWriterMonoItalic = localFont({
  src: "../fonts/iAWriterMonoV-Italic.ttf",
  variable: "--font-iawriter-mono-italic",
});

export const metadata: Metadata = {
  title: "Experimental AI Playground",
  description: "Experimental interface to Google Gemini Nano in Chrome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`bg-slate-50/20 ${iaWriterDuo.variable} ${iaWriterDuoItalic.variable} ${iaWriterQuattro.variable} ${iaWriterQuattroItelic.variable} ${iaWriterMono.variable} ${iaWriterMonoItalic.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
