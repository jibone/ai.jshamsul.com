import { tool as createTool } from "ai";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Tool to get weather for Singapore.
export const weatherTool = createTool({
  description:
    "Display the weather for for Singapore. A 4 day weather forcast for Singapore.",

  parameters: z.object({}),

  execute: async function () {
    const res = await fetch(
      "https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook",
    );
    const result = await res.json();
    return {
      errorMsg: result.errorMsg,
      forecasts: result.data.records[0].forecasts,
    };
  },
});

// Tool to get latest crypto price
export const cryptoChart = createTool({
  description:
    "Display crypto coin price chart widget that shows" +
    "cryptocurrency coins with their fiat cryptocurrency value." +
    "accepted cryptocurrency coins are 'bitcoin', 'ethereum', 'solana', 'dogecoin'" +
    "accepted fiat currency are 'usd' as US Dollar, 'sgd' Singapore Dollar, 'myr' Malaysian Ringgit",

  parameters: z.object({
    coin: z.string(),
    fiat: z.string(),
  }),

  execute: async function ({ coin, fiat }: { coin: string; fiat: string }) {
    const coinList = ["bitcoin", "ethereum", "solana", "dogecoin"];
    const fiatList = ["usd", "sgd", "myr"];

    if (coinList.includes(coin) && fiatList.includes(fiat)) {
      return {
        errorMsg: "",
        coin: coin,
        fiat: fiat,
      };
    }

    return {
      errorMsg: "Invalid coin or fiat",
      coin: null,
      fiat: null,
    };
  },
});

// tool to get latest stock price.
export const stockChart = createTool({
  description:
    "Display stock price chart widget that shows stock ticker " +
    "accepted stock ticker and company are 'NASDAQ:TSLA' for Tesla, 'NASDAQ:NVDA' for Nvidia 'NASDAQ:GRAB' for Grab" +
    "'NASDAQ:AAPL' for Apple, 'NASDAQ:AMZN' for Amazon, 'NASDAQ:MSFT' for Microsoft, 'NASDAQ:AMD' for AMD" +
    "'NASDAQ:META' for Meta, 'NASDAQ:NFLX' for Netflix, 'NASDAQ:COIN' for Coinbase, 'NASDAQ:GOOGL' for Google",

  parameters: z.object({
    ticker: z.string(),
  }),

  execute: async function ({ ticker }: { ticker: string }) {
    const tickerList = [
      "NASDAQ:TSLA",
      "NASDAQ:NVDA",
      "NASDAQ:AAPL",
      "NASDAQ:AMZN",
      "NASDAQ:MSFT",
      "NASDAQ:AMD",
      "NASDAQ:META",
      "NASDAQ:NFLX",
      "NASDAQ:COIN",
      "NASDAQ:GOOGL",
      "NASDAQ:GRAB",
    ];

    if (tickerList.includes(ticker)) {
      return {
        errorMsg: "",
        ticker: ticker,
      };
    }

    return {
      errorMsg: "Invalid ticker",
      ticker: null,
    };
  },
});

// get lofi stream.
export const lofiGirl = createTool({
  description:
    "Display the lo-fi girl video stream. The video stream plays calming Lo-fi music. It sometimes known as Lofi Girl.",
  parameters: z.object({}),

  execute: async function () {
    return {
      playerId: "jfKfPfyJRdk", // hard coded for now TODO expand this to get other lofi video.
    };
  },
});

// get latest crypto news
export const cryptoNews = createTool({
  description:
    "Display the latest news for Crypto, Cryptocurrency, Bitcoin, Web3.",

  parameters: z.object({}),

  execute: async function () {
    const res = await fetch("https://r.jina.ai/https://cointelegraph.com");
    const rawmd = await res.text();

    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `Pick out 5 top stories and list them with their links from this article in markdown. ${rawmd}`,
    });

    return text;
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayCryptoChart: cryptoChart,
  displayStockChart: stockChart,
  displayLofiGirl: lofiGirl,
  displayCryptoNews: cryptoNews,
};
