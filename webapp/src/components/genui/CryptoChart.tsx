import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gecko-coin-price-chart-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        locale?: string;
        outlined?: string;
        "coin-id"?: string;
        "initial-currency"?: string;
      };
    }
  }
}

type CryptoChartProps = {
  errorMsg: string;
  coin: string;
  fiat: string;
};

export function CryptoChartDisplay({ errorMsg, coin, fiat }: CryptoChartProps) {
  if (errorMsg !== "") {
    return <div>Error fetching data. Coin or fiat not supported, yet!</div>;
  }

  return (
    <div className="w-full">
      <Script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></Script>
      <gecko-coin-price-chart-widget
        locale="en"
        outlined="true"
        coin-id={coin}
        initial-currency={fiat}
      ></gecko-coin-price-chart-widget>
    </div>
  );
}
