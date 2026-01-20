import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { fetchProducts } from "./services/api";
import bgImage from "./bg.png";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      minHeight: "100vh"
    }}>
      <div className="container">
        <h1>Smart Inventory Dashboard</h1>

        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
