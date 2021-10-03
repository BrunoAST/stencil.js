import { r as registerInstance, h, f as Host } from './index-b9d6ae30.js';
import { H as HttpService } from './http-service-cbf4faf0.js';

const stockPriceCss = ":host{display:block;border:2px solid #3b013b;margin:2rem;padding:1rem;width:20rem;max-width:100%}:host(.error){border-color:orange}form input{font:inherit;color:#3b013b;padding:.15rem .25rem;display:block;margin:.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background-color:#3b013b;color:white;cursor:pointer}form button:disabled{background-color:#ccc;border-color:#ccc;color:white;cursor:not-allowed}form button:hover:not(:disabled),form button:active:not(:disabled){background-color:#750175;border-color:#750175}";

const StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stockInputValid = false;
    this.loading = false;
  }
  // This code will run when "stockSymbol" prop changes its value.
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    HttpService.stockPriceBySymbol(stockSymbol)
      .then((res) => res.json())
      .then(parsedResponse => {
      if (!parsedResponse["Global Quote"]["05. price"]) {
        throw new Error("Invalid symbol");
      }
      this.error = null;
      this.fetchedPrice = +parsedResponse["Global Quote"]["05. price"];
    })
      .catch(err => {
      this.error = err.message;
      this.fetchedPrice = null;
    })
      .finally(() => this.loading = false);
  }
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    this.stockInputValid = this.stockUserInput.trim() !== "";
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }
  dataContent() {
    if (this.loading) {
      return h("custom-spinner", null);
    }
    if (this.error) {
      return h("p", null, this.error);
    }
    if (!this.error) {
      return h("p", null, "Price: $", this.fetchedPrice);
    }
  }
  // This will be placed in the element level at the DOM which means that the value can be modified by
  // outside functions or css styles
  hostData() {
    return {
      class: this.error ? "error" : "",
    };
  }
  __stencil_render() {
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { type: "text", id: "stock-symbol", ref: element => this.stockInput = element, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, this.dataContent()),
    ];
  }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { StockPrice as stock_price };
