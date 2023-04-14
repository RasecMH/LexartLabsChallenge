import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps): JSX.Element {
  return (
    <button type='button' onClick={onClick}>
      {label}
    </button>
  );
}
