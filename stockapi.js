const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

const prices = {
  gme: "0.00",
};

const getStockPrice = async (symbol) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", (log) => console[log._type](log._text));

  await page.goto(`https://www.google.com/search?q=${symbol}+stock`);

  prices[symbol] = await page.evaluate(
    () => document.querySelector("g-card-section > span").textContent
  );
  await browser.close();
};

//fetch the gme stock price every 15 seconds
//setInterval(() => getStockPrice("gme"), 15000);

app.get("/stocks/:symbol", async (req, res) => {
  let { symbol } = req.params;

  //get the latest price in the background if we already have it in memory
  if (!prices[symbol]) await getStockPrice(symbol);
  else getStockPrice(symbol);

  res.send({ symbol, price: prices[symbol] ?? "N/A" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
