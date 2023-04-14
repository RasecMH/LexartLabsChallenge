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
    <select value={selectedOption} onChange={handleOptionChange}>
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
