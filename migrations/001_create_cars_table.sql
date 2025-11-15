CREATE TABLE IF NOT EXISTS car_listings (
    id SERIAL PRIMARY KEY,
    fb_id TEXT UNIQUE NOT NULL,          -- prevents duplicates
    title TEXT,
    price NUMERIC,
    currency VARCHAR(10),
    year INT,
    mileage INT,
    location TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
