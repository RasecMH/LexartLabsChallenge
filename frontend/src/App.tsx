import { useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import ProductsMock from './utils/ProductsMock.json';
import { IProduct } from './interfaces/ProductInterface';
import axios from 'axios';

function App() {
  const [error, setError] = useState('');
  const [productList, setProductList] = useState<IProduct[] | []>([]);
  const [returnMessage, setReturnMessage] =
    useState<string>('Faça uma pesquisa');

  const handleSubmit = async (
    query: string,
    category: string,
    store: string
  ) => {
    if (!query || !category || !store) {
      return setError('Preencha todos os campos');
    }

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

      setError('');
      if (data.length > 0) {
        setProductList(data);
      } else {
        setReturnMessage('Nada encontrado no bando de dados');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError('Erro na requisição');
    }
  };
  return (
    <div className='App'>
      <SearchBar
        onClick={(query: string, category: string, store: string) =>
          handleSubmit(query, category, store)
        }
      />
      {error && <span>{error}</span>}
      {productList.length ? (
        productList.map((product) => (
          <ProductCard
            key={product.id}
            category={product.category}
            description={product.description}
            image={product.image}
            price={product.price}
            store={product.store}
            url={product.url}
          />
        ))
      ) : (
        <span>{returnMessage}</span>
      )}
    </div>
  );
}

export default App;
