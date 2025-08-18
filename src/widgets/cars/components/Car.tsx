import { Car } from '@/app/(main)/[category]/page';
import React from 'react';
import Image from 'next/image';

const CarCard = ({ car }: { car: Car }) => {
    return (
        <div
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
    );
};

export default CarCard;