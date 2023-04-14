import React, { useState } from 'react';

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  placeholder,
  type,
  value,
  onChange,
}: InputProps): JSX.Element {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);
  };

  return (
    <div>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
}
