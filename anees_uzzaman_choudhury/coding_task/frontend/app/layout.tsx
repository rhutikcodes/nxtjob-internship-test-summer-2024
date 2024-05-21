import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import Providers from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NxtJob Community App",
  description: "Be part of an amazing community of people who share similar interests and start posting in various channels, grow your career!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Providers >
          {children}
          </Providers >
        </StoreProvider>
      </body>
    </html>
  );
}
