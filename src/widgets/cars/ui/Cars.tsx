'use client';

import React, { useState, useMemo } from 'react';
import { Car } from '@/app/(main)/[category]/page';
import NotFound from '../components/NotFound';
import CarCard from '../components/Car';

const Cars = ({ carsArr }: { carsArr: Car[] }) => {
    const [filters, setFilters] = useState({
        city: "",
        brand: "",
        withPhotos: false,
        priceFrom: "",
        priceTo: "",
        yearFrom: "",
        yearTo: ""
    });

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const filterCars = (cars: Car[], f: typeof filters) => {
        let result = cars;

        if (f.city) result = result.filter(car => car.city === f.city);
        if (f.brand) result = result.filter(car => car.title === f.brand);
        if (f.withPhotos) result = result.filter(car => car.images && car.images.length > 0);
        if (f.priceFrom) result = result.filter(car => (car.price ?? Infinity) >= Number(f.priceFrom));
        if (f.priceTo) result = result.filter(car => (car.price ?? -Infinity) <= Number(f.priceTo));
        if (f.yearFrom) result = result.filter(car => car.generation !== null && Number(car.generation) >= Number(f.yearFrom));
        if (f.yearTo) result = result.filter(car => car.generation !== null && Number(car.generation) <= Number(f.yearTo));

        return result;
    }

    const previewCars = useMemo(() => filterCars(carsArr, filters), [carsArr, filters]);

    const filteredCars = useMemo(() => filterCars(carsArr, appliedFilters), [carsArr, appliedFilters]);

    return (
        <>
            <div className='flex flex-col'>
                <div className='bg-[#fbf1d7] p-4 flex flex-col gap-3'>
                    <input
                        type="text"
                        placeholder='Город'
                        value={filters.city}
                        onChange={e => setFilters({ ...filters, city: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                    <input
                        type="text"
                        placeholder='Название'
                        value={filters.brand}
                        onChange={e => setFilters({ ...filters, brand: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                    <label className='flex items-center gap-3 text-[#888b94] mb-1'>
                        <input
                            type="checkbox"
                            checked={filters.withPhotos}
                            onChange={e => setFilters({ ...filters, withPhotos: e.target.checked })}
                        />
                        Только с фото
                    </label>
                    <input
                        type="number"
                        placeholder='Цена от'
                        value={filters.priceFrom}
                        onChange={e => setFilters({ ...filters, priceFrom: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                    <input
                        type="number"
                        placeholder='Цена до'
                        value={filters.priceTo}
                        onChange={e => setFilters({ ...filters, priceTo: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                    <input
                        type="number"
                        placeholder='Год от'
                        value={filters.yearFrom}
                        onChange={e => setFilters({ ...filters, yearFrom: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                    <input
                        type="number"
                        placeholder='Год до'
                        value={filters.yearTo}
                        onChange={e => setFilters({ ...filters, yearTo: e.target.value })}
                        className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
                    />
                </div>

                <div className='flex justify-center bg-[#fae8bb] p-4'>
                    <button
                        onClick={() => setAppliedFilters(filters)}
                        className='py-2 w-80 text-white bg-primary-accent hover:bg-primary-hover rounded-md text-[15px] transition-colors duration-200 cursor-pointer'
                    >
                        Показать {previewCars.length} объявлений
                    </button>
                </div>
            </div>

            <div className='my-5 flex flex-col gap-5'>
                {filteredCars.length > 0 ? (
                    filteredCars.map(car => <CarCard car={car} key={car.id} />)
                ) : (
                    <NotFound />
                )}
            </div>
        </>
    );
};

export default Cars;