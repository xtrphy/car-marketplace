import { Car } from '@/app/(main)/[category]/page';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCameraOutline } from 'react-icons/io5';
import { LuMapPin } from 'react-icons/lu';
import numeral from '@/utils/numeral/register';

const CarCard = ({ car }: { car: Car }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [isBars, setIsBars] = useState(false);

    const carImagesLength = car.images.length;

    const slicedImages = car.images.slice(0, 5);
    const slicedImagesLength = slicedImages.length;

    const remainingImages = carImagesLength - slicedImagesLength;

    const calculateWidth = (imagesLength: number) => {
        if (imagesLength < 5) {
            return 200 / imagesLength
        } else {
            return 40;
        }
    }

    function onHover(index: number) {
        setActiveImage(index)
        setIsBars(true);
    }

    function onLeave() {
        setActiveImage(0);
        setIsBars(false);
    }

    const formattedPrice = numeral(car.price).format("0,0 $");

    return (
        <Link
            href={`/cars/${car.id}`}
            className='flex justify-start rounded-md border hover:bg-[#f0f0f0] transition-colors duration-200'
            onMouseLeave={onLeave}
        >
            <div className='w-[200px] relative'>
                {isBars && (
                    <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none rounded-bl-md' />
                )}
                {slicedImagesLength >= 3 && slicedImages.map((_, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => onHover(i)}
                        style={{
                            width: `${calculateWidth(slicedImagesLength)}px`,
                            left: `${i * calculateWidth(slicedImagesLength)}px`,
                        }}
                        className={`absolute h-full top-0 cursor-pointer`}
                    >
                        {isBars && (
                            <div
                                style={{ backgroundColor: `${i === activeImage ? 'orange' : 'white'}` }}
                                className=' absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] w-[85%] bg-white'
                            />
                        )}
                    </div>
                ))}

                {carImagesLength > slicedImagesLength && activeImage === slicedImagesLength - 1 &&
                    <span className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-sm pointer-events-none'>
                        <IoCameraOutline size={30} />
                        ещё {remainingImages} фото
                    </span>
                }

                <Image
                    src={car.images && car.images.length > 0 ? car.images[activeImage] : '/placeholder.webp'}
                    alt={car.title}
                    width={200}
                    height={160}
                    className='rounded-tl-md rounded-bl-md w-[200px] h-[160px] object-cover'
                />
            </div>
            <div className='w-[905px] flex flex-col p-3'>

                <div className='flex justify-between'>
                    <span className='text-primary-accent text-lg hover:text-[#f33] cursor-pointer'>
                        {car.title}
                    </span>
                    <span className='font-medium'>
                        {formattedPrice}
                    </span>
                </div>

                <div className='flex flex-col text-[13px]'>
                    <span>{car.mileage}</span>
                    <span>
                        {car.engine_size} л., {car.gearbox}
                    </span>
                    <span className='flex items-center gap-1 mt-12 text-[#777]'>
                        <LuMapPin />
                        {car.city}
                    </span>
                </div>

            </div>
        </Link>
    );
};

export default CarCard;