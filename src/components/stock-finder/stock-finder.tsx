import { Component, Event, EventEmitter, h, State } from "@stencil/core";
import { HttpService } from "../../services/http-service";

@Component({
  tag: "stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string; }[] = [];
  @State() loading = false;

  @Event({ bubbles: true, composed: true }) symbolSelected: EventEmitter<string>;

  onFindStocks(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    HttpService.getByStockName(stockName)
      .then((res: Response) => res.json())
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

  onSelectSymbol(symbol: string): void {
    this.symbolSelected.emit(symbol);
  }

  dataContent() {
    if (this.loading) {
      return <custom-spinner />;
    }
    return <ul>
      {
        this.searchResults.map(result =>
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>,
        )
      }
    </ul>;
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input
          type="text"
          ref={element => this.stockNameInput = element}
        />
        <button type="submit">Fetch</button>
      </form>,
      <ul>
        {this.dataContent()}
      </ul>,
    ];
  }
}
