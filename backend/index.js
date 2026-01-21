const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data/products.json");

app.get("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(products);
});

app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
