const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/screenshot", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Falta la URL");

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle2" });

    // Esperar a que cargue el canvas del gráfico
    await page.waitForSelector('div[data-test="chart-canvas-container"]', {
      timeout: 10000,
    });

    const chartElement = await page.$('div[data-test="chart-canvas-container"]');
    const screenshotBuffer = await chartElement.screenshot({ type: "png" });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Error al capturar gráfico:", error);
    res.status(500).send("Error al generar la captura.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
