import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["cyrillic"],
});

export const metadata: Metadata = {
    title: "Моторум",
    description: "Маркетплейс для покупки и продажи авто",
    icons: {
        icon: "/favicon.webp",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${manrope.className} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
