import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

export async function scrapeCars() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-user"]
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://www.facebook.com/login", {
      waitUntil: "networkidle2",
    });

    await page.type("#email", process.env.FB_EMAIL, { delay: 80 });
    await page.type("#pass", process.env.FB_PASSWORD, { delay: 80 });

    await page.click("[name='login']");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
 
    const URL =
      "https://www.facebook.com/marketplace/manila/cars?minPrice=350000&exact=false";

    await page.goto(URL, { waitUntil: "networkidle2" });
    await page.waitForSelector('[role="main"]');

    //  Scrape the listings
    const listings = await page.evaluate(() => {
      const cards = document.querySelectorAll(
        '[role="main"] a[href*="/marketplace/item"]'
      );

      const carData = [];

      cards.forEach((card) => {
        const href = card.getAttribute("href");

        // Extract unique Facebook listing ID
        const fb_id = href.match(/item\/(\d+)/)?.[1];

        const text = card.innerText.split("\n");
        const title = text[0];

        const priceMatch = card.innerText.match(/₱[\d,]+/);
        const price = priceMatch
          ? priceMatch[0].replace(/[₱,]/g, "")
          : null;

        const yearMileage = card.innerText.match(/(\d{4}).+?(km|KM)/i);
        const year = yearMileage ? yearMileage[1] : null;
        const mileage = yearMileage
          ? yearMileage[0].match(/\d+/)[0]
          : null;

        const location = text[text.length - 1];

        carData.push({
          fb_id,
          title,
          price,
          currency: "PHP",
          year,
          mileage,
          location,
        });
      });

      return carData;
    });

    await browser.close();
    return listings;
  } catch (err) {
    console.error("Scraper Error:", err);
    await browser.close();
    throw err;
  }
}
