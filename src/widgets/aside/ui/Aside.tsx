'use client';

import Link from 'next/link';
import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaCirclePlus } from 'react-icons/fa6';
import { redirect, usePathname } from 'next/navigation';
import { IoMdExit } from 'react-icons/io';
import { supabase } from '@/utils/supabase/supabaseClient';

const Aside = () => {
    const pathname = usePathname();

    const tabs = [
        {
            label: "Мои объявления",
            href: "/cabinet",
            icon: <RxDashboard size={20} />
        },
        {
            label: "Новое объявление",
            href: "/cabinet/new",
            icon: <FaCirclePlus size={20} />
        },
        {
            label: "Настройки",
            href: "/cabinet/settings",
            icon: <IoSettingsOutline size={20} />
        }
    ];

    const handleExit = async () => {
        const { error } = await supabase.auth.signOut()
        redirect('/cars');
    };

    return (
        <div className='p-4 w-[250px]'>
            <ul className='flex flex-col gap-3'>
                {tabs.map(({ label, href, icon }, i) => (
                    <li key={i}>
                        <Link
                            href={href}
                            className={`flex items-center gap-2 rounded-lg p-3 text-[15px] transition-colors active:bg-[#d9e8f0]
                                ${pathname === href
                                    ? 'bg-[#e8f3f8] text-primary-accent'
                                    : ''
                                }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    </li>
                ))}
                <button
                    onClick={handleExit}
                    className='flex items-center gap-2 rounded-lg p-3 text-[15px] transition-colors cursor-pointer'
                >
                    <IoMdExit size={20} />
                    Выйти
                </button>
            </ul>
        </div>
    );
};

export default Aside;