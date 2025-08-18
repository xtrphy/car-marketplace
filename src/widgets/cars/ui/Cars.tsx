'use client';

import React, { useState } from 'react';
import { Car } from '@/app/(main)/[category]/page';
import NotFound from '../components/NotFound';
import CarCard from '../components/Car';

const Cars = ({ carsArr }: { carsArr: Car[] }) => {
    const [cars, setCars] = useState(carsArr);
    const [filteredCars, setFilteredCars] = useState([]);

    return (
        <>
            <div className='mx-auto'>
                {cars.length < 1 && (
                    <NotFound />
                )}
            </div>

            <div className='flex flex-col gap-5'>
                {cars.length > 0 && cars.map(car => (
                    <CarCard car={car} key={car.id} />
                ))}
            </div>
        </>
    );
};

export default Cars;