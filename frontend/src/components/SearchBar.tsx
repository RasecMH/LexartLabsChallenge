import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import Button from './Button';

interface SearchBarProps {
  onClick: () => void;
}

export default function SearchBar({ onClick }: SearchBarProps) {
  const [webValue, setWebValue] = useState<string>('');
  const [categorieValue, setCategorieValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  console.log(webValue);
  console.log(categorieValue);
  console.log(inputValue);

  return (
    <div>
      <Dropdown
        placeholder='Web'
        options={['Todas', 'Mercado Livre', 'Buscapé']}
        onChange={(v) => setWebValue(v)}
      />
      <Dropdown
        placeholder='Categorias'
        options={['Geladeira', 'Celular', 'TV']}
        onChange={(v) => setCategorieValue(v)}
      />
      <Input
        placeholder='Pesquisar'
        type='text'
        onChange={(v) => setInputValue(v)}
      />
      <Button label='Search' onClick={onClick} />
    </div>
  );
}
