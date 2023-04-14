import { useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import { IProduct } from './interfaces/ProductInterface';
import axios from 'axios';

function App() {
  const [error, setError] = useState('');
  const [productList, setProductList] = useState<IProduct[] | []>([]);
  const [returnMessage, setReturnMessage] =
    useState<string>('Faça uma pesquisa');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    query: string,
    category: string,
    store: string
  ) => {
    if (!query || !category || !store) {
      return setError('Preencha todos os campos');
    }
    setError('');
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        'http://localhost:3001/products/search',
        {
          params: {
            query: query.toLowerCase(),
            category: category.toLowerCase(),
            store,
          },
        }
      );

      setIsLoading(false);
      if (data.length > 0) {
        setProductList(data);
      } else {
        setReturnMessage('Nada encontrado no banco de dados');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError('Erro na requisição');
    }
  };
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='w-full h-full'>
        <SearchBar
          onClick={(query: string, category: string, store: string) =>
            handleSubmit(query, category, store)
          }
        />
      </div>
      {error && <span className='text-4xl text-red-500 mt-10'>{error}</span>}
      {isLoading ? (
        <span className='text-4xl'>Carregando...</span>
      ) : productList.length ? (
        <div className='grid md:grid-cols-3 lg:grid-cols-5 p-10 gap-4 '>
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              category={product.category}
              description={product.description}
              image={product.image}
              price={product.price}
              store={product.store}
              url={product.url}
            />
          ))}
        </div>
      ) : (
        <span className='text-8xl text-center text-gray-700'>
          {returnMessage}
        </span>
      )}
    </div>
  );
}

export default App;
