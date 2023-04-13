import { load } from 'cheerio';
import { IProduct } from '../interfaces/IProduct';
import fetcher from './fetcher';

export default class Scraper {
  public async MercadoLivreScraper(category: string): Promise<IProduct[] | []> {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
    const { data } = await fetcher(url, category);
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

  public async BuscapeScraper(category: string): Promise<IProduct[] | []> {
    const url = 'https://www.buscape.com.br/search?q=';
    const { data } = await fetcher(url, category);
    const parsedHtml = load(data);

    let productList: IProduct[] = [];

    const productsCards = parsedHtml("[data-testid='product-card']");

    productsCards.each((i, item) => {
      const image = parsedHtml(item)
        .find('[data-testid="product-card::image"] > span > img')
        .attr('src');
      const description = parsedHtml(item)
        .find('[data-testid="product-card::name"]')
        .text();
      const price = parsedHtml(item)
        .find('[data-testid="product-card::price"]')
        .text()
        .replace(/[^\d,.-]/g, '')
        .replace(',', '.');
      const url = parsedHtml(item)
        .find('[data-testid="product-card::card"]')
        .attr('href');

      if (image && description && price && url) {
        productList[i] = {
          image,
          description,
          category: category,
          price: parseFloat(price),
          store: 'Buscape',
          url,
        };
      }
    });

    return productList;
  }
}
