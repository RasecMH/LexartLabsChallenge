import React, { useState } from 'react';

interface DropdownProps {
  placeholder: string;
  options: string[];
  onChange: (selectedOption: string) => void;
}

export default function Dropdown({
  placeholder,
  options,
  onChange,
}: DropdownProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
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
