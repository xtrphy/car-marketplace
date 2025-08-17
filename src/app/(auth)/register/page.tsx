'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleRegister() {
        const { data: user, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message);
            setSuccess('');
            return;
        }

        if (user) {
            setSuccess('Проверьте почту для подтверждения регистрации.');
            setError('');
        }
    };

    return (
        <>
            <p className='text-sm mb-1'>Регистрация личного кабинета</p>
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
            <input
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
                className='border rounded-[3px] h-[36px] text-sm pl-[7px] focus:outline-none focus:border-[#2a81dd]'
                placeholder='Подтвердите пароль'
            />
            {error && <p className='text-red-500 mt-3 text-sm'>{error}</p>}
            {success && <p className='text-green-500 mt-3 text-sm'>{success}</p>}
            <button
                onClick={handleRegister}
                className='mt-2 bg-primary-accent text-white text-sm rounded-[3px] p-2 hover:bg-[#34a2e9] transition-colors duration-200 cursor-pointer'
            >
                Продолжить
            </button>
            <div className='mt-2 text-[13px]'>
                Уже есть аккаунт?
                <Link
                    href='/login'
                    className='ml-1 underline hover:no-underline hover:text-primary-accent'
                >
                    Войти
                </Link>
            </div>
        </>
    );
};