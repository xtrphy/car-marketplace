import React from 'react';
import { PiSmileySadThin } from 'react-icons/pi';

const NotFound = () => {
    return (
        <span className='mt-10 flex flex-col items-center gap-2 text-3xl font-medium text-gray-500'>
            Ничего не найдено
            <PiSmileySadThin size={40} strokeWidth={3} />
        </span>
    );
};

export default NotFound;