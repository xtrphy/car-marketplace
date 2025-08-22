import { Car } from '@/app/(main)/[category]/page';
import { supabase } from '@/utils/supabase/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import numeral from "@/utils/numeral/register"
import { IoTrashOutline } from 'react-icons/io5';

const Advertisement = ({ advertisement, onDelete }: { advertisement: Car, onDelete: (id: string) => void }) => {
    const formattedPrice = numeral(advertisement.price).format("0,0 $");

    const deleteAdv = async (id: string) => {
        const { error } = await supabase
            .from("cars")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error)
        } else {
            onDelete(id);
        };
    };

    return (
        <div className='shadow-[0_2px_4px_0_rgba(28,24,25,0.1)] text-sm rounded-md py-3 px-4 flex flex-col w-[350px] border'>
            <Link
                href={`/cars/${advertisement.id}`}
                target='_blank'
                className='font-medium text-primary-accent hover:text-primary-hover'
            >
                {advertisement.title}
            </Link>
            <span className='mt-0.5 font-medium'>{formattedPrice}</span>
            <Image
                src={advertisement.images[0] || '/placeholder.webp'}
                alt={advertisement.title}
                width={160}
                height={120}
                className='mt-3 rounded-md w-[160px] h-[120px] object-cover'
            />
            <span className='mt-3'>
                {advertisement.generation} год, {advertisement.engine_size} л., {advertisement.gearbox}, {advertisement.drive}, {advertisement.mileage} км., {advertisement.color}
            </span>
            <span className='mt-3 text-[#888b94]'>
                {advertisement.city}
            </span>
            <hr className='my-3' />
            <button
                className='flex gap-1 text-primary-accent hover:text-primary-hover cursor-pointer'
                onClick={() => deleteAdv(advertisement.id)}
            >
                <IoTrashOutline size={20} />
                Снять с продажи
            </button>
        </div>
    );
};

export default Advertisement;