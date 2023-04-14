import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 lg:mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full'
      type='button'
      onClick={onClick}>
      {label}
    </button>
  );
}
