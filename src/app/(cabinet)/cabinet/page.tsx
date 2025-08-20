'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Car } from '@/app/(main)/[category]/page';
import Advertisement from '@/widgets/advertisement/ui/Advertisement';

const Cabinet = () => {
    const [user, setUser] = useState<User | null>(null);
    const [advertisements, setAdvertisements] = useState<Car[]>([]);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user);
        }

        getUser();
    }, []);

    useEffect(() => {
        if (!user?.id) return;

        const getAdvertisements = async () => {
            const { data, error } = await supabase
                .from("cars")
                .select("*")
                .eq("profile_id", user.id);

            if (error) console.error(error);
            setAdvertisements(data ?? []);
        }

        getAdvertisements();
    }, [user?.id]);

    return (
        <div>
            <span className='text-xl font-medium'>Ваши объявления на сайте</span>
            <div className='mt-3 flex gap-3'>
                {advertisements.length > 0 ? advertisements.map(advertisement => (
                    <Advertisement
                        advertisement={advertisement}
                        onDelete={(id) => setAdvertisements(prev => prev.filter(a => a.id !== id))}
                        key={advertisement.id}
                    />
                )) : (
                    <span className='text-sm text-[#888b94]'>
                        Нет подходящий объявлений. Это легко исправить, <span className='text-primary-accent'>подав их</span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default Cabinet;