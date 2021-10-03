const AV_API_KEY = "K386H8FJ9TS45OZ0";

class HttpService {
  static getByStockName(stockName) {
    return fetch(`${this.baseURL}SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`);
  }
  static stockPriceBySymbol(symbol) {
    return fetch(`${this.baseURL}GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`);
  }
}
HttpService.baseURL = "https://www.alphavantage.co/query?function=";

export { HttpService as H };
