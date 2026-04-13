import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profit Ethics | Precision Trading Strategies",
  description: "Master the Market with Market Profile, Order Flow and Time-Based Trading tailored for Indian MCX & Forex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid"></div>
        {children}
      </body>
    </html>
  );
}
