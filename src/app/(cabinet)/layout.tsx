import "../globals.css";
import Footer from "../../widgets/footer/ui/Footer";
import Top from "@/widgets/header/components/Top";
import Aside from "@/widgets/aside/ui/Aside";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Top />
            <main className="px-4 flex-grow mx-96">
                <div className="flex">
                    <Aside />
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}
