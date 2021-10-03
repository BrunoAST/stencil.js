import { r as registerInstance, e as createEvent, h } from './index-b9d6ae30.js';
import { H as HttpService } from './http-service-cbf4faf0.js';

const stockFinderCss = ":host{display:block;border:2px solid #3b013b;margin:2rem;padding:1rem;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:.15rem .25rem;display:block;margin:.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background-color:#3b013b;color:white;cursor:pointer}form button:disabled{background-color:#ccc;border-color:#ccc;color:white;cursor:not-allowed}form button:hover:not(:disabled),form button:active:not(:disabled){background-color:#750175;border-color:#750175}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background-color:#3b013b;color:white}";

const StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.symbolSelected = createEvent(this, "symbolSelected", 7);
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    HttpService.getByStockName(stockName)
      .then((res) => res.json())
      .then(parsedResponse => {
      this.searchResults = parsedResponse["bestMatches"].map(match => {
        return {
          symbol: match["1. symbol"],
          name: match["2. name"],
        };
      });
    })
      .catch(err => console.log(err))
      .finally(() => this.loading = false);
  }
  onSelectSymbol(symbol) {
    this.symbolSelected.emit(symbol);
  }
  dataContent() {
    if (this.loading) {
      return h("custom-spinner", null);
    }
    return h("ul", null, this.searchResults.map(result => h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)));
  }
  render() {
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { type: "text", ref: element => this.stockNameInput = element }), h("button", { type: "submit" }, "Fetch")),
      h("ul", null, this.dataContent()),
    ];
  }
};
StockFinder.style = stockFinderCss;

export { StockFinder as stock_finder };
