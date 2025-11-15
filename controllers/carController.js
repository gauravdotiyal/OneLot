import { scrapeCars } from "../scraper/facebookScraper.js";
import { 
  saveCarListing,
  getAllCars,
  getCar,
  updateCar,
  deleteCar 
} from "../models/carModel.js";

// Scrape and save to DB
export async function scrapeAndStore(req, res) {
  try {
    const scraped = await scrapeCars();
    let saved = 0;

    for (const car of scraped) {
      if (car.fb_id) {
        await saveCarListing(car);
        saved++;
      }
    }

    res.json({
      success: true,
      message: "Scrape completed",
      saved,
      total: scraped.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET all
export async function getCars(req, res) {
  const cars = await getAllCars();
  res.json(cars);
}

// GET one
export async function getCarById(req, res) {
  const car = await getCar(req.params.id);
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
}

// UPDATE
export async function updateCarById(req, res) {
  const car = await updateCar(req.params.id, req.body);
  res.json(car);
}

// DELETE
export async function deleteCarById(req, res) {
  await deleteCar(req.params.id);
  res.json({ success: true });
}
