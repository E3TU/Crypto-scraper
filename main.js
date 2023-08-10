import fetch from "node-fetch";
import * as cheerio from 'cheerio';

const url = "https://coinmarketcap.com/currencies/monero/";
const USD_EUR_RATE = "https://www.investing.com/currencies/usd-eur";

async function getEuroDollarExchangeRate() {

}

async function getcryptoPrice() {
    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    const priceEl = $("span.sc-16891c57-0.dxubiK.base-text");

    const price = priceEl.text().trim();

    console.log("Monero price: " + price);
}


getcryptoPrice();