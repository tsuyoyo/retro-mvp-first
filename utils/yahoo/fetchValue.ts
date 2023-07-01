import axios from 'axios';
import { load } from 'cheerio';
import { PriceData } from '@/utils/models/priceData';

const buildUrl = (title: string) =>
  `https://auctions.yahoo.co.jp/closedsearch/closedsearch/${title}%20neogeo%20-CD/2084005537/`;

const fetchYahooAuctionHtml = async (title: string) => {
  const url = buildUrl(title);
  try {
    const html = await (await axios.get(url)).data;
    return {
      url,
      html,
    };
  } catch (e) {
    throw Error(`Failed to fetch data from ${url}`);
  }
};

export const fetchPriceDataOnYahooAuction = async (title: string): Promise<PriceData> => {
  return fetchYahooAuctionHtml(title)
    .then((data) => {
      const $ = load(data.html);

      const priceDetailChildren = $('.SearchMode__priceDetail').children();
      const priceTags = priceDetailChildren.filter('a');

      const minPrice = $(priceTags[0]).text().replace('円', '').replace(',', '');
      const maxPrice = $(priceTags[1]).text().replace('円', '').replace(',', '');
      const averagePrice = $(priceTags[2]).text().replace('円', '').replace(',', '');

      // console.log('最安価格:', minPrice);
      // console.log('最高価格:', maxPrice);
      // console.log('平均価格:', averagePrice);

      return {
        url: data.url,
        max: Number(maxPrice),
        min: Number(minPrice),
        averagePrice: Number(averagePrice),
      };
    })
    .catch((e) => {
      console.log(`Error - ${e}`);
      return {
        url: '-',
        max: 0,
        min: 0,
        averagePrice: 0,
      };
    });
};
