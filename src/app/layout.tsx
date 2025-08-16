import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";
import Header from "@/widgets/Header/ui/Header";
import Footer from "@/widgets/Footer/ui/Footer";

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
                className={`${manrope.className} antialiased flex flex-col min-h-screen`}
            >
                <Header />
                <main className="px-4 flex-grow mx-96">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
