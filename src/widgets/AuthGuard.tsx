'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import Spinner from './spinner/ui/Spinner';

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.replace('/login');
                return;
            }

            setLoading(false);
        }

        checkAuth()
    }, [router]);

    if (loading) return <Spinner />

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;