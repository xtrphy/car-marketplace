'use client';

import { Car } from '@/app/(main)/[category]/page';
import React, { Suspense, lazy } from 'react';
import numeral from "@/utils/numeral/register";

const ImageGallery = lazy(() => import("@/components/ImageGallery"));

const CarPage = ({ car }: { car: Car }) => {
    const details = [
        { label: "Город", value: car.city },
        { label: "Поколение", value: car.generation },
        { label: "Кузов", value: car.carcase },
        { label: "Объем двигателя, л", value: car.engine_size },
        { label: "Коробка", value: car.gearbox },
        { label: "Привод", value: car.drive },
        { label: "Руль", value: car.steering_wheel ? "Справа" : "Слева" },
        { label: "Цвет", value: car.color },
        { label: "Растаможен в Казахстане", value: car.customs ? "Да" : "Нет" },
    ];

    const formattedPrice = numeral(car.price).format("0,0 $");

    return (
        <div className='flex mb-10'>
            <div className='flex flex-col items-start w-[405px]'>
                <div className='flex flex-col mb-10'>
                    <span className='text-lg'>{car.title}</span>
                    <span className='text-3xl font-black mt-2'>{formattedPrice}</span>
                </div>
                <div className='w-full'>
                    {details.map(({ label, value }) =>
                        value ? (
                            <dl key={label} className='flex items-start justify-between mb-4'>
                                <dt className='text-[#888b94] w-[130px]'>{label}</dt>
                                <dd className='w-auto'>{value}</dd>
                            </dl>
                        ) : null)}
                </div>
                <div className='shadow-[0_2px_10px_0_rgba(28,24,25,0.1)] mt-2 p-5 w-full rounded-lg'>
                    <span className='text-sm text-[#888b94]'>Контакты продавца</span>
                    <div className='flex flex-col gap-3'>
                        <span className='text-lg font-black'>+7 747...</span>
                        <button className='bg-primary-accent rounded-md text-white py-3 px-4 hover:bg-primary-hover transition-colors duration-200 cursor-pointer'>
                            Написать сообщение
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col ml-[50px]'>
                <Suspense fallback={
                    <div className='w-[700px] h-[420px] bg-gray-200 animate-pulse rounded-lg' />
                }>
                    <ImageGallery images={car.images} title={car.title} />
                </Suspense>
            </div>
        </div>
    );
};

export default CarPage;