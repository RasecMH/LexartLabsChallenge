import { load } from 'cheerio';
import { IProduct } from '../interfaces/IProduct';
import fetcher from './fetcher';
import currency from 'currency.js';

export default class Scraper {
  public async MercadoLivreScraper(
    query: string,
    category: string
  ): Promise<IProduct[] | []> {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
    const param = `${category} ${query}`;
    const { data } = await fetcher(url, param);
    return data?.results.map((item: any) => {
      return {
        image: item.thumbnail,
        description: item.title,
        category: category,
        price: item.price,
        store: 'Mercado Livre',
        url: item.permalink,
      };
    });
  }

  public async BuscapeScraper(
    query: string,
    category: string
  ): Promise<IProduct[] | []> {
    let productList: IProduct[] = [];

    for (let i = 1; i < 5; i += 1) {
      const url = `https://www.buscape.com.br/search?hitsPerPage=6&page=${i}&q=`;
      const param = `${category} ${query}`;
      const { data } = await fetcher(url, param);
      const parsedHtml = load(data);

      const productsCards = parsedHtml("[data-testid='product-card']");

      productsCards.each((i, item) => {
        const image = parsedHtml(item).find('span > img').attr('src');
        const description = parsedHtml(item)
          .find('[data-testid="product-card::name"]')
          .text();
        const price = currency(
          parsedHtml(item).find('[data-testid="product-card::price"]').text(),
          {
            symbol: 'R$',
            separator: '.',
            decimal: ',',
          }
        ).value;
        const url = parsedHtml(item)
          .find('[data-testid="product-card::card"]')
          .attr('href');

        if (image && description && price && url) {
          productList.push({
            image,
            description: description,
            category: category,
            price: price,
            store: 'Buscapé',
            url: `https://buscape.com.br${url}`,
          });
        }
      });
    }

    return productList;
  }
}
