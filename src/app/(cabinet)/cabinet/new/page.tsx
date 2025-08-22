'use client';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { supabase } from '@/utils/supabase/supabaseClient';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";
import FilterInput from '@/components/FilterInput';

export type FormState = {
    category: string;
    title: string;
    model: string;
    generation: string;
    carcase: string;
    drive: string;
    gearbox: string;
    engineSize: string;
    mileage: string;
    steeringWheel: boolean;
    customs: boolean;
    color: string;
    price: string;
    city: string;
    images: File[];
};

const initialForm: FormState = {
    category: "cars",
    title: "",
    model: "",
    generation: "",
    carcase: "",
    drive: "Передний",
    gearbox: "",
    engineSize: "",
    mileage: "",
    steeringWheel: false,
    customs: true,
    color: "",
    price: "",
    city: "",
    images: [],
};

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

const NewAdv = () => {
    const [form, setForm] = useState<FormState>(initialForm);

    const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const fullTitle = `${form.title} ${form.model} ${form.generation}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let uploadedUrls: string[] = [];

        if (form.images && form.images.length > 0) {
            uploadedUrls = await uploadToCloudinary(form.images);
        }

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from("cars")
            .insert([
                {
                    profile_id: user?.id,
                    title: fullTitle,
                    category: form.category,
                    generation: form.generation,
                    carcase: form.carcase,
                    drive: form.drive,
                    gearbox: form.gearbox,
                    engine_size: form.engineSize,
                    mileage: form.mileage,
                    steering_wheel: form.steeringWheel,
                    color: form.color,
                    price: form.price,
                    city: form.city,
                    customs: form.customs,
                    images: uploadedUrls,
                }
            ]);

        if (error) console.error(error);
        else {
            setForm(initialForm);
        }
    };

    const handleRemoveImage = (index: number) => {
        handleChange("images", form.images.filter((_, i) => i !== index));
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
                                    onClick={() => handleChange("category", categoryType)}
                                    className={`cursor-pointer hover:underline ${form.category === categoryType
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
                                    onClick={() => handleChange("drive", label)}
                                    className={`cursor-pointer hover:underline ${label === form.drive
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

                    <FilterInput
                        type='text'
                        placeholder='Toyota'
                        value={form.title}
                        onChange={e => handleChange("title", e.target.value)}
                        label="Выберите марку"
                    />

                    <FilterInput
                        type='text'
                        placeholder='Camry'
                        value={form.model}
                        onChange={e => handleChange("model", e.target.value)}
                        label="Выберите модель"
                    />

                    <FilterInput
                        type='text'
                        placeholder='2025'
                        value={form.generation}
                        onChange={e => handleChange("generation", e.target.value)}
                        label="Выберите год"
                    />

                    <FilterInput
                        type='text'
                        placeholder='Седан'
                        value={form.carcase}
                        onChange={e => handleChange("carcase", e.target.value)}
                        label="Выберите тип кузова"
                    />

                    <FilterInput
                        type='text'
                        placeholder='Автомат'
                        value={form.gearbox}
                        onChange={e => handleChange("gearbox", e.target.value)}
                        label="Выберите тип КПП"
                    />

                    <FilterInput
                        type='text'
                        placeholder='2'
                        value={form.engineSize}
                        onChange={e => handleChange("engineSize", e.target.value)}
                        label="Введите объем двигателя (л.)"
                    />

                    <FilterInput
                        type='text'
                        placeholder='10000'
                        value={form.mileage}
                        onChange={e => handleChange("mileage", e.target.value)}
                        label="Введите пробег (км)"
                    />

                    <FilterInput
                        type='text'
                        placeholder='Белый'
                        value={form.color}
                        onChange={e => handleChange("color", e.target.value)}
                        label="Цвет кузова"
                    />

                    <FilterInput
                        type='number'
                        placeholder='3500000'
                        value={form.price}
                        onChange={e => handleChange("price", e.target.value)}
                        label="Цена"
                    />

                    <FilterInput
                        type='text'
                        placeholder='Астана'
                        value={form.city}
                        onChange={e => handleChange("city", e.target.value)}
                        label="Город"
                    />

                    <FilterInput
                        type='checkbox'
                        checked={form.steeringWheel}
                        onChange={e => handleChange("title", e.target.value)}
                        label="Правый руль"
                        required={false}
                    />

                    <FilterInput
                        type='checkbox'
                        checked={form.customs}
                        onChange={e => handleChange("customs", e.target.checked)}
                        label="Растаможен в Казахстане"
                    />

                </div>
                <span className='text-xl font-medium'>Загрузите изображения</span>
                <input
                    type="file"
                    multiple
                    onChange={e => {
                        const files = e.target.files;
                        if (!files) return;
                        handleChange("images", [...form.images, ...Array.from(files)]);
                    }}
                />
                <div className='flex gap-2 mt-2'>
                    {form.images?.map((file, i) => (
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