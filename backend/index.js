const express = require("express");
const cors = require("cors");
const { router: productRoutes } = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Browser root → show products
const { products } = require("./routes/products");
app.get("/", (req, res) => {
  res.json(products);
});

// API routes
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
