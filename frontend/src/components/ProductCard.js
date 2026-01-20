import React, { useState } from "react";
import "./ProductCard.css";
import { updateStock } from "../services/api";

const ProductCard = ({ product, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (delta) => {
  const newQty = product.stock + delta;
  if (newQty < 0) return;

  setLoading(true);
  const startTime = Date.now();

  try {
    const res = await updateStock(product.id, newQty);
    onUpdate(res.product);
  } catch (err) {
    alert("Failed to update stock");
  } finally {
    const elapsed = Date.now() - startTime;
    const minTime = 700; 

    setTimeout(() => {
      setLoading(false);
    }, Math.max(0, minTime - elapsed));
  }
};


  const isLowStock = product.stock < product.lowStockThreshold;

  return (
    <div className={`product-card ${isLowStock ? "low-stock" : ""}`}>
      <img
        src={`/images/${product.name.toLowerCase()}.png`}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock}</p>

      {isLowStock && <span className="badge">Critical Low</span>}

      <div className="controls">
        <button
          onClick={() => handleChange(-1)}
          disabled={product.stock === 0 || loading}
        >
          -
        </button>

        <button onClick={() => handleChange(1)} disabled={loading}>
          +
        </button>
      </div>

      {loading && <p className="loading">Updating...</p>}
    </div>
  );
};

export default ProductCard;
