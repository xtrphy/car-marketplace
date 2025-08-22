import React from 'react';

type FilterInputType = {
    label?: string;
    type: "text" | "checkbox" | "number";
    placeholder?: string;
    value?: string;
    checked?: boolean;
    required?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FilterInput = ({ label, type, placeholder, value, checked, onChange, required }: FilterInputType) => {
    if (type === "checkbox") {
        return (
            <label className='flex items-center gap-3 text-[#888b94] mb-1 cursor-pointer'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className='w-4 h-4'
                />
                {label}
            </label>
        );
    }

    return (
        <label className='flex flex-col text-[#888b94] mb-1'>
            {label}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className='mt-1 focus:outline-1 outline-primary-accent px-3 py-1 border rounded-sm text-[15px]'
            />
        </label>
    );
};

export default FilterInput;