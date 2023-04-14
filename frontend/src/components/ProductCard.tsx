import React from 'react';
import MercadoLivreLogo from '../assets/mercado-livre.svg';
import BuscapeLogo from '../assets/buscape-logo.svg';
import Button from './Button';

interface ProductCardProps {
  image: string;
  description: string;
  category: string;
  price: number;
  store: string;
  url: string;
}

export default function ProductCard({
  image,
  description,
  category,
  price,
  store,
  url,
}: ProductCardProps): JSX.Element {
  return (
    <div className='w-80 md:w-full h-full mt-5 p-5 bg-gray-100 border-4 rounded-xl shadow-sm flex flex-col items-center justify-between gap-4'>
      <div className='relative border-4 rounded-xl shadow-md w-full h-2/3'>
        <img src={image} className='w-full h-64 object-cover' />
        <img
          className='w-full absolute bottom-0 h-1/3 bg-gray-200/50'
          src={store === 'Buscapé' ? BuscapeLogo : MercadoLivreLogo}
        />
      </div>
      <div className='flex flex-col text-center truncate w-full'>
        <div className='truncate'>
          <p className='font-semibold '>{description}</p>
        </div>
        <p>{category.toLocaleUpperCase()}</p>
        <p>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <a className='w-full' href={url} target='_blank'>
        <Button label='Ir para site' />
      </a>
    </div>
  );
}
