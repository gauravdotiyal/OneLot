import express from "express";
import {
  scrapeAndStore,
  getCars,
  getCarById,
  updateCarById,
  deleteCarById
} from "../controllers/carController.js";

const router = express.Router();

router.get("/scrape", scrapeAndStore);   // scrape + save
router.get("/", getCars);                // list all
router.get("/:id", getCarById);          // get one
router.put("/:id", updateCarById);       // update listing
router.delete("/:id", deleteCarById);    // delete listing

export default router;
