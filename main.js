import fetch from "node-fetch";
import * as cheerio from "cheerio";

//Full name of the cryptocurrency in lowercase e.g bitcoin
let cryptoname = "monero";

const url = "https://coinmarketcap.com/currencies/" + cryptoname + "/";
const usd_eur = "https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=EUR";

const cryptopriceEl = "span.sc-65e7f566-0.clvjgF.base-text";
const usdeurpriceEl = "p.sc-e08d6cef-1.fwpLse"

async function getcryptoPrice() {
  //Get price of the crypto
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const priceEl = $(cryptopriceEl);
  const price = priceEl.text().trim();
  const parsedPrice = price.replace(/[^0-9.]/g, '');

  //Get usd eur exchange rate
  const exchangerateRes = await fetch(usd_eur);
  const exchangerateHtml = await exchangerateRes.text();
  const exchangeRate$ = cheerio.load(exchangerateHtml);
  const exchangerateEl = exchangeRate$(usdeurpriceEl);
  const usdeurexchangeRate = parseFloat(exchangerateEl.text().trim());

  const priceinEur = parsedPrice * usdeurexchangeRate;

  // console.log(parsedPrice);
  // console.log(usdeurexchangeRate);

  console.log(cryptoname + " price in EUR: " + priceinEur.toFixed(2));
}

getcryptoPrice();
