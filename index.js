// Archivo: index.js

const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing TradingView URL.');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.setViewport({ width: 1280, height: 720 });

  const screenshot = await page.screenshot();
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.send(screenshot);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
