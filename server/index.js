import express from "express";
import cors from "cors";

// create server
const app = express();
app.use(express.json());
app.use(cors);

// Run server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server works on port number ${PORT}`);
});
