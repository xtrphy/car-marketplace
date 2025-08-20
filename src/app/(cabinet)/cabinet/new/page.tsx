'use client';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { supabase } from '@/utils/supabase/supabaseClient';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";

const NewAdv = () => {
    const [category, setCategory] = useState("cars");
    const [title, setTitle] = useState("");
    const [model, setModel] = useState("");
    const [generation, setGeneration] = useState("");
    const fullTitle = `${title} ${model} ${generation}`;
    const [carcase, setCarcase] = useState("");
    const [drive, setDrive] = useState("Передний");
    const [gearbox, setGearbox] = useState("");
    const [engineSize, setEngineSize] = useState("");
    const [mileage, setMileage] = useState("");
    const [steeringWheel, setSteeringWheel] = useState(false);
    const [customs, setCustoms] = useState(true);
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const categories = [
        {
            label: "Машины",
            categoryType: "cars"
        },
        {
            label: "Запчасти",
            categoryType: "zapchasti"
        },
        {
            label: "Спецтехника",
            categoryType: "spectehnika"
        }
    ];

    const drives = [
        {
            label: "Передний"
        },
        {
            label: "Задний"
        },
        {
            label: "Полный"
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let uploadedUrls: string[] = [];

        if (images && images.length > 0) {
            uploadedUrls = await uploadToCloudinary(images);
        }

        console.log(uploadedUrls);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("cars")
            .insert([
                {
                    profile_id: user?.id,
                    title: fullTitle,
                    category,
                    generation,
                    carcase,
                    drive,
                    gearbox,
                    engine_size: engineSize,
                    mileage,
                    steering_wheel: steeringWheel,
                    color,
                    price,
                    city,
                    customs,
                    images: uploadedUrls,
                }
            ]);

        if (error) console.error(error);
        else {
            setTitle("");
            setModel("");
            setGeneration("")
            setGearbox("");
            setCarcase("");
            setEngineSize("");
            setMileage("");
            setColor("");
            setPrice("");
            setCity("");
            setImages([]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev?.filter((_, i) => i !== index));
    }

    return (
        <>
            <span className='text-xl font-medium'>Новое объявление</span>

            <form
                onSubmit={handleSubmit}
                className='my-3 flex flex-col gap-3 border p-4 rounded-lg'
            >
                <div className='flex justify-between'>
                    <div>
                        <span className='text-[#888b94]'>Категория</span>
                        <div className='flex gap-3 text-primary-accent'>
                            {categories.map(({ label, categoryType }, i) => (
                                <button
                                    type='button'
                                    key={i}
                                    onClick={() => setCategory(categoryType)}
                                    className={`cursor-pointer hover:underline ${category === categoryType
                                        ? 'text-green-500 hover:text-green-600'
                                        : 'hover:text-primary-hover'}
                            `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col text-[#888b94] mb-1'>
                        Привод
                        <div className='flex gap-3 text-primary-accent'>
                            {drives.map(({ label }, i) => (
                                <button
                                    type='button'
                                    key={i}
                                    onClick={() => setDrive(label)}
                                    className={`cursor-pointer hover:underline ${label === drive
                                        ? 'text-green-500 hover:text-green-600'
                                        : 'hover:text-primary-hover'}
                            `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <div className='grid grid-cols-3 gap-5'>
                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите марку
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder='Toyota'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите модель
                        <input
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            type="text"
                            placeholder='Camry'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите год
                        <input
                            value={generation}
                            onChange={e => setGeneration(e.target.value)}
                            type="text"
                            placeholder='2025'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите тип кузова
                        <input
                            value={carcase}
                            onChange={e => setCarcase(e.target.value)}
                            type="text"
                            placeholder='Седан'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите тип КПП
                        <input
                            value={gearbox}
                            onChange={e => setGearbox(e.target.value)}
                            type="text"
                            placeholder='Автомат'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите объем двигателя (л.)
                        <input
                            value={engineSize}
                            onChange={e => setEngineSize(e.target.value)}
                            type="text"
                            placeholder='2'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Введите пробег (км)
                        <input
                            value={mileage}
                            onChange={e => setMileage(e.target.value)}
                            type="text"
                            placeholder='10000'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Цвет кузова
                        <input
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            type="text"
                            placeholder='Белый'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Цена
                        <input
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            type="number"
                            placeholder='3500000 тг'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex flex-col text-[#888b94] mb-1'>
                        Город
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            type="text"
                            placeholder='Астана'
                            className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                        />
                    </label>

                    <label className='flex items-center gap-3 text-[#888b94] mb-1'>
                        Правый руль
                        <input
                            checked={steeringWheel}
                            onChange={() => setSteeringWheel(prev => !prev)}
                            type="checkbox"
                        />
                    </label>

                    <label className='flex items-center gap-3 text-[#888b94] mb-1'>
                        Растаможен в Казахстане
                        <input
                            checked={customs}
                            onChange={() => setCustoms(prev => !prev)}
                            type="checkbox"
                        />
                    </label>
                </div>
                <span className='text-xl font-medium'>Загрузите изображения</span>
                <input
                    type="file"
                    multiple
                    onChange={e => {
                        const files = e.target.files;
                        if (!files) return;
                        setImages(prev => [...prev, ...Array.from(files)]);
                    }}
                />
                <div className='flex gap-2 mt-2'>
                    {images?.map((file, i) => (
                        <div key={i} className='relative group'>
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`preview-${i}`}
                                className='w-24 h-24 object-cover rounded'
                                width={24}
                                height={24}
                            />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(i)}
                                className='absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer'
                            >
                                <IoIosClose size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type='submit'
                    className='mt-5 mx-auto py-2 w-80 text-white bg-primary-accent hover:bg-primary-hover rounded-md text-[15px] transition-colors duration-200 cursor-pointer'
                >
                    Подать объявление
                </button>
            </form>
        </>
    );
};

export default NewAdv;