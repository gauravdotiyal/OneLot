import { pool } from "../db.js";

// INSERT or UPDATE (already done)
export async function saveCarListing(car) {
  const query = `
    INSERT INTO car_listings (fb_id, title, price, currency, year, mileage, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (fb_id) DO UPDATE 
    SET 
      title = EXCLUDED.title,
      price = EXCLUDED.price,
      currency = EXCLUDED.currency,
      year = EXCLUDED.year,
      mileage = EXCLUDED.mileage,
      location = EXCLUDED.location,
      updated_at = NOW()
    RETURNING *;
  `;

  const values = [
    car.fb_id,
    car.title,
    car.price,
    car.currency,
    car.year,
    car.mileage,
    car.location
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

// Get all
export async function getAllCars() {
  const { rows } = await pool.query("SELECT * FROM car_listings ORDER BY created_at DESC");
  return rows;
}

// Get one
export async function getCar(id) {
  const { rows } = await pool.query("SELECT * FROM car_listings WHERE id = $1", [id]);
  return rows[0];
}

// Update
export async function updateCar(id, data) {
  const query = `
    UPDATE car_listings
    SET title=$1, price=$2, year=$3, mileage=$4, location=$5, updated_at=NOW()
    WHERE id=$6
    RETURNING *;
  `;
  const values = [
    data.title,
    data.price,
    data.year,
    data.mileage,
    data.location,
    id
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Delete
export async function deleteCar(id) {
  await pool.query("DELETE FROM car_listings WHERE id = $1", [id]);
  return true;
}
