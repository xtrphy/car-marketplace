'use client'

import { supabase } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleLogin() {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) console.error(error)
        else {
            router.push('/cars');
        }
    }

    return (
        <>
            <p className='text-sm mb-1'>Вход в личный кабинет</p>
            <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                className='border rounded-[3px] h-[36px] text-sm pl-[7px] focus:outline-none focus:border-[#2a81dd]'
                placeholder='Электронная почта'
            />
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                className='border rounded-[3px] h-[36px] text-sm pl-[7px] focus:outline-none focus:border-[#2a81dd]'
                placeholder='Пароль'
            />
            <button
                onClick={handleLogin}
                className='mt-2 bg-primary-accent text-white text-sm rounded-[3px] p-2 hover:bg-[#34a2e9] transition-colors duration-200 cursor-pointer'
            >
                Продолжить
            </button>
            <div className='mt-2 text-[13px]'>
                Нет аккаунта?
                <Link
                    href='/register'
                    className='ml-1 underline hover:no-underline hover:text-primary-accent'
                >
                    Зарегистрироваться
                </Link>
            </div>
        </>
    )
}