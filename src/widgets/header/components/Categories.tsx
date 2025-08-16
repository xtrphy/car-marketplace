'use client';

import React from 'react';
import { FaCar } from 'react-icons/fa6';
import { IoCarSport } from 'react-icons/io5';
import { GiCarWheel } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa6';
import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const categories = [
    {
        category: 'Машины',
        href: '/cars',
        icon: <FaCar className='text-primary-accent' />
    },
    {
        category: 'Новые авто',
        href: '/new',
        icon: <IoCarSport className='text-primary-accent' size={20} />
    },
    {
        category: 'Запчасти',
        href: '/zapchasti',
        icon: <GiCarWheel className='text-primary-accent' size={18} />
    },
    {
        category: 'Коммерческие',
        href: '/spectehnika',
        icon: <FaTruck className='text-primary-accent' size={20} />
    },
];

const Categories = () => {
    const params = useParams<{ category: string }>();
    const categoryFromUrl = params.category || "cars";

    const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

    useEffect(() => {
        setActiveCategory(categoryFromUrl);
    }, [categoryFromUrl]);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    }

    return (
        <div className='mx-96 px-4 my-6 flex gap-2'>
            <ul className='flex gap-3'>
                {categories.map(({ category, href, icon }, i) => (
                    <li
                        key={i}
                        className={
                            clsx('rounded-lg hover:bg-secondary-hover transition-colors duration-200',
                                { 'bg-secondary-hover': activeCategory === href.slice(1, href.length) })}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <Link href={href} className='flex gap-2 items-center py-2 px-3'>
                            {icon}
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;