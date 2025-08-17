import Footer from "@/widgets/footer/ui/Footer";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className='flex justify-center items-center flex-grow'>
                <Link href='/cars' className='flex items-center gap-1.5 absolute top-[25px] left-10 text-primary-accent text-sm'>
                    <BsArrowLeft />
                    Назад
                </Link>
                <div className='flex flex-col items-center gap-7'>
                    <span className='text-3xl font-black'>Моторум.kz</span>
                    <div className="flex flex-col gap-3 border rounded-[3px] shadow-xl p-5 w-[314px]">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
