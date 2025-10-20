import { createContext, useEffect, useState } from "react";
const { VITE_BASE_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterByName, setFilterByName] = useState("");

  useEffect(() => {
    fetch(`${VITE_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!filterByName.trim()) {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter((p) =>
          p.title.toLowerCase().includes(filterByName.toLowerCase())
        )
      );
    }
  }, [filterByName, allProducts]);

  const previewProducts = filteredProducts.slice(0, 9);

  return (
    <GlobalContext.Provider
      value={{
        allProducts, // lista completa
        filteredProducts, // solo prodotti filtrati
        previewProducts, // anteprima dinamica dei filtrati
        loading,
        error,
        filterByName,
        setFilterByName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
