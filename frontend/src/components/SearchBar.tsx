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
    <div>
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
      <Input
        placeholder='Pesquisar'
        type='text'
        value={inputValue}
        onChange={(v) => setInputValue(v)}
      />
      <Button
        label='Search'
        onClick={() => onClick(inputValue, categorieValue, webValue)}
      />
    </div>
  );
}
