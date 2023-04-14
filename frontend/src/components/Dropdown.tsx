import React, { useState } from 'react';

interface DropdownProps {
  placeholder: string;
  options: string[];
  selectedOption: string;
  onChange: (selectedOption: string) => void;
}

export default function Dropdown({
  placeholder,
  options,
  selectedOption,
  onChange,
}: DropdownProps): JSX.Element {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2'
      value={selectedOption}
      onChange={handleOptionChange}>
      <option value='' disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
