import { useEffect } from "react";

type CryptoChartProps = {
  errorMsg: string;
  ticker: string;
};

export function StockChartDisplay({ errorMsg, ticker }: CryptoChartProps) {
  useEffect(() => {
    const widgetContainer = document.querySelector(
      `.tradingview-widget-container__widget__${ticker.split(":")[1]}`,
    );

    if (widgetContainer) {
      // Clear any existing content to avoid duplication
      widgetContainer.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.async = true;

      // Configure the widget with the provided symbols
      const config = {
        symbols: ticker,
        chartOnly: false,
        width: "100%",
        height: 500,
        locale: "en",
        colorTheme: "light",
        autosize: true,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        changeMode: "price-and-percent",
        chartType: "area",
        maLineColor: "#2962FF",
        maLineWidth: 1,
        maLength: 9,
        headerFontSize: "medium",
        lineWidth: 2,
        lineType: 0,
        dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      };

      // Inject the configuration as JSON into the script element
      script.innerHTML = JSON.stringify(config);
      widgetContainer.appendChild(script);
    }
  }, [ticker]);

  if (errorMsg !== "") {
    return <div>Error fetching data. Coin or fiat not supported, yet!</div>;
  }

  return (
    <div className="w-full h-500px">
      <div className="tradingview-widget-container h-500px">
        <div
          className={`tradingview-widget-container__widget__${ticker.split(":")[1]}`}
        ></div>
      </div>
    </div>
  );
}
