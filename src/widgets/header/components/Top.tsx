'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { FaCirclePlus } from 'react-icons/fa6';
import { supabase } from '@/utils/supabase/supabaseClient';
import type { User } from '@supabase/supabase-js';

const Top = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user);
        }

        getUser();
    }, []);

    const redirectToNew = () => {
        if (!user) {
            router.push('/login');
        } else {
            router.push('/cabinet/new');
        }
    };

    return (
        <div className='border-b-1 border-b-[#eee]'>
            <div className='mx-96 px-4'>
                <div className='flex justify-between py-3'>
                    <Link href='/cars' className='text-4xl font-black'>Моторум.kz</Link>

                    <div className='flex items-center gap-5'>
                        {user ? (
                            <Link href='/cabinet'>Личный кабинет</Link>
                        ) : (
                            <Link href='/login' className='border border-[#505b713b] py-1.5 px-4 rounded-lg flex items-center gap-2 text-primary-accent text-[15px] hover:bg-secondary-hover cursor-pointer transition-colors duration-200'>
                                <CiUser size={20} strokeWidth={1} />
                                Вход и регистрация
                            </Link>
                        )}
                        <button
                            onClick={redirectToNew}
                            className='flex items-center gap-2 bg-primary-accent py-1.5 px-4 rounded-lg text-[15px] text-white hover:bg-primary-hover cursor-pointer transition-colors duration-200'
                        >
                            <FaCirclePlus size={20} />
                            Подать объявление
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;