import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "LUMINA TECH",
  description: "Premium Tech Storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#050505] text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
