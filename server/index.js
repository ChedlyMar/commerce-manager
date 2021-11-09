import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { productRouter } from "./routes/productRoute.js";

dotenv.config();

// create server
const app = express();
app.use(express.json());
app.use(cors);

app.use("/product", productRouter);

//connect to database
mongoose.connect(process.env.DB_URI).then(() => {
  console.log("db connected !");
});

// Run server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server works on port number ${PORT}`);
});
