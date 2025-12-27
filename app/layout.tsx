import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "منصة تعاون السورية",
  description: "منصة تعاون هي منصة غير ربحية تهدف لبناء حملات تبرعات لإنشاء مشاريع استراتيجية لحل المشكلات الرئيسية في الجمهورية العربية السورية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
