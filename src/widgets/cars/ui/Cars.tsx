'use client';

import React, { useState, useMemo } from 'react';
import { Car } from '@/app/(main)/[category]/page';
import NotFound from '../components/NotFound';
import CarCard from '../components/Car';
import FilterInput from '@/components/FilterInput';

type FormState = {
    city: string;
    brand: string;
    withPhotos: boolean;
    priceFrom: string;
    priceTo: string;
    yearFrom: string;
    yearTo: string;
};

const Cars = ({ carsArr }: { carsArr: Car[] }) => {
    const [filters, setFilters] = useState<FormState>({
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

    const handleChange = <K extends keyof FormState>(key: K, value: FormState[K] | boolean) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            <div className='flex flex-col'>
                <div className='bg-[#fbf1d7] p-4 flex flex-col gap-3'>
                    <FilterInput
                        type='text'
                        value={filters.city}
                        onChange={e => handleChange("city", e.target.value)}
                        placeholder='Город'
                    />
                    <FilterInput
                        type='text'
                        value={filters.brand}
                        onChange={e => handleChange("brand", e.target.value)}
                        placeholder="Название"
                    />
                    <FilterInput
                        type='checkbox'
                        checked={filters.withPhotos}
                        onChange={e => handleChange("withPhotos", e.target.checked)}
                        label='Только с фото'
                    />
                    <FilterInput
                        type='number'
                        value={filters.priceFrom}
                        onChange={e => handleChange("priceFrom", e.target.value)}
                        placeholder="Цена от"
                    />
                    <FilterInput
                        type='number'
                        value={filters.priceTo}
                        onChange={e => handleChange("priceTo", e.target.value)}
                        placeholder="Цена до"
                    />
                    <FilterInput
                        type='number'
                        value={filters.yearFrom}
                        onChange={e => handleChange("yearFrom", e.target.value)}
                        placeholder="Год от"
                    />
                    <FilterInput
                        type='number'
                        value={filters.yearTo}
                        onChange={e => handleChange("yearTo", e.target.value)}
                        placeholder="Год до"
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