"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { store } from './store'
import { Provider } from 'react-redux'

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets:["latin"],weight:["500"]});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<ClerkProvider>
    <Provider store={store}>
<html lang="en" suppressHydrationWarning={true}>
  <body className={`${inter.className} ${poppins.className}`}>{children}</body>
</html>
</Provider>
</ClerkProvider>
  );
}
