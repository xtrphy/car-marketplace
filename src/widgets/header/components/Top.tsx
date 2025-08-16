import React from 'react';
import { CiUser } from 'react-icons/ci';
import { FaCirclePlus } from 'react-icons/fa6';

const Top = () => {
    return (
        <div className='border-b-1 border-b-[#eee]'>
            <div className='mx-96 px-4'>
                <div className='flex justify-between py-3'>
                    <div>
                        <span className='text-4xl font-black'>Моторум.kz</span>
                    </div>

                    <div className='flex items-center gap-5'>
                        <button className='border border-[#505b713b] py-1.5 px-4 rounded-lg flex items-center gap-2 text-primary-accent text-[15px] hover:bg-secondary-hover cursor-pointer transition-colors duration-200'>
                            <CiUser size={20} strokeWidth={1} />
                            Вход и регистрация
                        </button>

                        <button className='flex items-center gap-2 bg-primary-accent py-1.5 px-4 rounded-lg text-[15px] text-white hover:bg-primary-hover cursor-pointer transition-colors duration-200'>
                            <FaCirclePlus size={20} />
                            Подать объявление
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;