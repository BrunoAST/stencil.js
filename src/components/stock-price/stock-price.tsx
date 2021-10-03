import { Component, h, Listen, Prop, State, Watch } from "@stencil/core";
import { HttpService } from "../../services/http-service";

@Component({
  tag: "stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({ attribute: "stock-symbol", mutable: true, reflect: true }) stockSymbol: string;

  // This code will run when "stockSymbol" prop changes its value.
  @Watch("stockSymbol")
  stockSymbolChanged(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  componentDidLoad(): void {
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  fetchStockPrice(stockSymbol: string): void {
    this.loading = true;
    HttpService.stockPriceBySymbol(stockSymbol)
      .then((res: Response) => res.json())
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

  @Listen("symbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent): void {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  onUserInput(event: Event): void {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== "";
  }

  onFetchStockPrice(event: Event): void {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }

  dataContent() {
    if (this.loading) {
      return <custom-spinner />;
    }
    if (this.error) {
      return <p>{this.error}</p>;
    }
    if (!this.error) {
      return <p>Price: ${this.fetchedPrice}</p>;
    }
  }

  // This will be placed in the element level at the DOM which means that the value can be modified by
  // outside functions or css styles
  hostData() {
    return {
      class: this.error ? "error" : "",
    };
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          type="text"
          id="stock-symbol"
          ref={element => this.stockInput = element}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button
          type="submit"
          disabled={!this.stockInputValid || this.loading}
        >
          Fetch
        </button>
      </form>,
      <div>{this.dataContent()}</div>,
    ];
  }
}
