import "../globals.css";
import Footer from "../../widgets/footer/ui/Footer";
import Top from "@/widgets/header/components/Top";
import Aside from "@/widgets/aside/ui/Aside";
import AuthGuard from "@/widgets/AuthGuard";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <Top />
            <main className="px-4 flex-grow mx-96">
                <div className="flex">
                    <Aside />
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </AuthGuard>
    );
}
