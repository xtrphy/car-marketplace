import React from 'react';
import { FaVk, FaTelegram, FaGithub } from 'react-icons/fa6';

const socialMedias = [
    {
        icon: <FaVk size={20} />,
        href: "https://vk.com/xtrphyo"
    },
    {
        icon: <FaTelegram size={20} />,
        href: "https://t.me/xtrphy1"
    },
    {
        icon: <FaGithub size={20} />,
        href: "https://github.com/xtrphy",
    }
]

const SocialMedias = () => {
    return (
        <ul className='flex gap-2'>
            {socialMedias.map(({ icon, href }, i) => (
                <li key={i} className='hover:text-primary-accent transition-colors duration-200'>
                    <a href={href}>
                        {icon}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialMedias;