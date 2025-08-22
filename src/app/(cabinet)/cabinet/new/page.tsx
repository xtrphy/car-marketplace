'use client';

import { Suspense, lazy } from "react";

const NewAdvForm = lazy(() => import("@/widgets/newAdvForm/ui/NewAdvForm"));

const NewAdv = () => {
    return (
        <>
            <span className='text-xl font-medium'>Новое объявление</span>
            <Suspense fallback={
                <div className="my-3 p-4 border rounded-lg">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                        <div className="h-12 bg-gray-200 rounded w-80 mx-auto"></div>
                    </div>
                </div>
            }>
                <NewAdvForm />
            </Suspense>
        </>
    );
};

export default NewAdv;