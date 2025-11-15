# 🚗 Car Listing Scraper Service  
A backend service built with **Node.js**, **Express**, **Puppeteer**, and **PostgreSQL** that scrapes car listings from Facebook Marketplace, stores them in a relational database, and provides clean REST APIs for accessing and updating the data.

---

## 📌 Features

### ✅ 1. Web Scraper
- Scrapes Facebook Marketplace car listings (Manila region).
- Extracts:
  - `fb_id` (unique listing ID)
  - Title
  - Price
  - Currency (PHP)
  - Year
  - Mileage
  - Location
- Uses Puppeteer to automate login + extraction.
- Automatically avoids duplicates using `fb_id`.

---

### ✅ 2. Database (PostgreSQL)
- Clean relational schema.
- Migration file included.
- Supports full CRUD operations.
- Duplicate-safe insert using `ON CONFLICT (fb_id) DO UPDATE`.

---

### ✅ 3. REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/cars/scrape` | Scrape Facebook + store/update DB |
| **GET** | `/cars` | Fetch all car listings |
| **GET** | `/cars/:id` | Fetch a single listing |
| **PUT** | `/cars/:id` | Update a listing |
| **DELETE** | `/cars/:id` | Delete a listing |

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the repository  
```bash
git clone git@github.com:gauravdotiyal/OneLot.git
cd OneLot
 

### Install Dependencies 

npm install 


 ### Setup you .env file 
FB_EMAIL=your_facebook_email
FB_PASSWORD=your_facebook_password
DATABASE_URL=postgresql://postgres:password@localhost:5432/car_scraper

### Open PgAdmin and run 
\i migrations/001_create_cars_table.sql;
This will create the car lisings 

### Start the server 
node index.js

## Server Runs at 
http://localhost:3000


Author
Gaurav Dotiyal

