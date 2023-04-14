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
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
}
