const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check / root
app.get("/", (req, res) => {
  res.send("Smart Inventory Dashboard API is running");
});

// API routes
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
