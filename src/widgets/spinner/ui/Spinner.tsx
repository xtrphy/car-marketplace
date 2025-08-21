import React from 'react';

const Spinner = () => {
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div
                className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
            ></div>
        </div>
    );
};

export default Spinner;