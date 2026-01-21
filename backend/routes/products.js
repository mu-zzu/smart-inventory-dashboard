const express = require("express");
const router = express.Router();

// ✅ In-memory products (WORKS ON RENDER)
let products = [
  { id: 1, name: "Apple", price: 30, stock: 20, lowStockThreshold: 5 },
  { id: 2, name: "Banana", price: 10, stock: 15, lowStockThreshold: 4 },
  { id: 3, name: "Milk", price: 50, stock: 8, lowStockThreshold: 3 },
  { id: 4, name: "Bread", price: 40, stock: 12, lowStockThreshold: 4 },
  { id: 5, name: "Eggs", price: 6, stock: 30, lowStockThreshold: 6 }
];

// GET /products
router.get("/products", (req, res) => {
  res.json(products);
});

// POST /update-stock
router.post("/update-stock", (req, res) => {
  const { id, newQuantity } = req.body;

  if (newQuantity < 0) {
    return res.status(400).json({ error: "Stock cannot be negative" });
  }

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  product.stock = newQuantity;

  res.json({
    message: "Stock updated successfully",
    product
  });
});

module.exports = router;
