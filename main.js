import fetch from "node-fetch";
import * as cheerio from 'cheerio';

let i;
let links = [];
let classes = [];

const url = "https://coinmarketcap.com/currencies/monero/";
const usd_eur = "https://fi.investing.com/currencies/usd-eur";

const cryptopriceEl = "span.sc-16891c57-0.dxubiK.base-text";
const usd_eurpriceEl = "span.text-2xl";

links.push(url, usd_eur);
classes.push(cryptopriceEl, usd_eurpriceEl);

async function getcryptoPrice() {
    for(i = 0; i < 2; i++) {
        const res = await fetch(links[i]);
        const html = await res.text();
    
        const $ = cheerio.load(html);
    
        const priceEl = $(classes[i]);
    
        const price = priceEl.text().trim();
    
        console.log(price);
    }
}

getcryptoPrice();