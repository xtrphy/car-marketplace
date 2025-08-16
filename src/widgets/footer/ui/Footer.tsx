import React from 'react';
import SocialMedias from '../components/SocialMedias';

const Footer = () => {
    return (
        <footer className='w-full flex flex-col gap-2 justify-center items-center py-6 bg-[#f2f2f2] text-[#888b94]'>
            <span className='font-black text-2xl text-black'>Моторум.kz</span>
            <div className='flex gap-3 items-center'>
                <span>Владислав Перепечкин</span>
                <SocialMedias />
            </div>
        </footer>
    );
};

export default Footer;