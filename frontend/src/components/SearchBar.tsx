import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import Button from './Button';

interface SearchBarProps {
  onClick: (query: string, category: string, store: string) => void;
}

export default function SearchBar({ onClick }: SearchBarProps) {
  const [webValue, setWebValue] = useState<string>('');
  const [categorieValue, setCategorieValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div
      className='flex flex-col items-center justify-center gap-2 bg-yellow-300 p-2 w-full h-full
    lg:flex-row lg:py-10 lg:gap-6
    '>
      <div className='flex w-3/4 gap-2'>
        <Dropdown
          placeholder='Web'
          options={['Todas', 'Mercado Livre', 'Buscapé']}
          selectedOption={webValue}
          onChange={(v) => setWebValue(v)}
        />
        <Dropdown
          placeholder='Categorias'
          options={['Geladeira', 'Celular', 'TV']}
          selectedOption={categorieValue}
          onChange={(v) => setCategorieValue(v)}
        />
      </div>
      <div className='w-3/4'>
        <Input
          placeholder='Pesquisar'
          type='text'
          value={inputValue}
          onChange={(v) => setInputValue(v)}
        />
      </div>
      <div className='w-2/4 lg:w-1/4'>
        <Button
          label='Search'
          onClick={() => onClick(inputValue, categorieValue, webValue)}
        />
      </div>
    </div>
  );
}
