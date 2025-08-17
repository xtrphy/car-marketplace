import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/supabase/types/supabase';
import Image from 'next/image';

export type Car = Database["public"]["Tables"]["cars"]["Row"];

const page = async () => {
    const supabase = await createClient();
    const { data: cars } = await supabase
        .from("cars")
        .select("*")
        .returns<Car[]>();

    return (
        <div className='flex gap-5 w-full'>
            {cars?.map(car => (
                <div
                    key={car.id}
                    className='rounded-md border w-[230px] flex flex-col'
                >
                    <Image
                        src={car.photo}
                        alt={car.title}
                        width={230}
                        height={0}
                        className='rounded-t-md'
                    />
                    <div className='flex flex-col justify-between p-3 h-full'>
                        <span className='font-medium mb-1'>{car.price} ₸</span>
                        <span className='text-primary-accent text-[15px] hover:text-[#f33] cursor-pointer'>{car.title}</span>
                        <span className='text-[13px] mt-1'>{car.engine_size}, {car.gearbox}</span>
                        <span className='mt-5 text-[13px] text-[#777]'>{car.city}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default page;