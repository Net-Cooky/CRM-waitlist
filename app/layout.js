import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ClientFlow - Client Management Made Simple",
  description: "One platform for invoices, file sharing, contracts, and client communication. Stop juggling multiple tools and start focusing on what matters. Join the waitlist for early access.",
  keywords: "client management, invoicing, file sharing, contracts, freelancer tools, agency software, payment reminders, project tracking",
  authors: [{ name: "ClientFlow Team" }],
  creator: "ClientFlow",
  publisher: "ClientFlow",
  openGraph: {
    title: "ClientFlow - Client Management Made Simple",
    description: "One platform for invoices, file sharing, contracts, and client communication. Join the waitlist for early access.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientFlow - Client Management Made Simple",
    description: "One platform for invoices, file sharing, contracts, and client communication. Join the waitlist for early access.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
