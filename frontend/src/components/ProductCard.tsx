import React from 'react';
import MercadoLivreLogo from '../assets/mercado-livre.svg';
import BuscapeLogo from '../assets/buscape-logo.svg';

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
    <div className='w-28 h-auto'>
      <div>
        <img src={image} />
        <img src={store === 'Buscape' ? BuscapeLogo : MercadoLivreLogo} />
      </div>
      <div>
        <h2>{description}</h2>
        <p>{category}</p>
        <p>{price}</p>
      </div>
      <a href={url}>
        <button>Ir para site</button>
      </a>
    </div>
  );
}
