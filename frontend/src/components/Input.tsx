import React, { useState } from 'react';

interface InputProps {
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}

export default function Input({
  placeholder,
  type,
  onChange,
}: InputProps): JSX.Element {
  const [value, setValue] = useState<string>('');

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
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
