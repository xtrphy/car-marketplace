import React, { useState } from 'react';
import Image from 'next/image';

const ImageGallery = ({ images, title }: { images: string[], title: string }) => {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <>
            <div className='w-[700px] h-[420px]'>
                <Image
                    src={images[activeImage] || '/placeholder.webp'}
                    alt={title}
                    width={750}
                    height={470}
                    className='rounded-lg w-full h-full object-cover'
                />
            </div>

            <ul className='flex gap-1.5 mt-4'>{images.map((image, i) => (
                <li key={i}>
                    <button
                        onClick={() => setActiveImage(i)}
                        className={`${activeImage === i
                            ? 'outline-2 outline-primary-accent'
                            : 'outline-none'
                            } hover:opacity-80 transition-opacity duration-200 cursor-pointer rounded-lg w-[90px] h-[70px]`}
                    >
                        <Image
                            src={image}
                            alt={title}
                            width={90}
                            height={70}
                            className='rounded-md w-full h-full object-cover'
                        />
                    </button>
                </li>
            ))}
            </ul>
        </>
    );
};

export default ImageGallery;