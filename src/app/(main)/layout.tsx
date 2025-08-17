import "../globals.css";
import Header from '../../widgets/header/ui/Header'
import Footer from "../../widgets/footer/ui/Footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="px-4 flex-grow mx-96">
                {children}
            </main>
            <Footer />
        </>
    );
}
