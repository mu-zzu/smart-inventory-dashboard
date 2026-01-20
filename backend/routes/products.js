const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/products.json");


const readProducts = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

router.get("/products", (req, res) => {
  const products = readProducts();
  res.json(products);
});


router.post("/update-stock", (req, res) => {
  const { id, newQuantity } = req.body;

  if (newQuantity < 0) {
    return res.status(400).json({
      error: "Stock cannot be negative",
    });
  }

  const products = readProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  product.stock = newQuantity;
  writeProducts(products);

  res.json({
    message: "Stock updated successfully",
    product,
  });
});

module.exports = router;
