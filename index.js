import express from "express";
import carRoutes from "./routes/carRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/cars", carRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
