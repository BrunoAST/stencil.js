import { AV_API_KEY } from "../global/global";

export class HttpService {
  private static baseURL = "https://www.alphavantage.co/query?function=";

  static getByStockName(stockName: string): Promise<Response> {
    return fetch(`${this.baseURL}SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`);
  }

  static stockPriceBySymbol(symbol: string): Promise<Response> {
    return fetch(`${this.baseURL}GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`);
  }
}
