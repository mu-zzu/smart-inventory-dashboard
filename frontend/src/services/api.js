const API_BASE = "https://smart-inventory-dashboard-kqq4.onrender.com";


export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const updateStock = async (id, newQuantity) => {
  const res = await fetch(`${API_BASE}/update-stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, newQuantity }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }

  return res.json();
};
