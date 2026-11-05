
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StudioSpace | Find Your Creative Space",
    description:
        "Discover, explore and book premium creative studios with StudioSpace.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            data-theme="light"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-screen flex-col bg-base-100 text-base-content transition-colors duration-300">
                <Navbar />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}
