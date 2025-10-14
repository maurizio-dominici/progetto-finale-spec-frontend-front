import { createContext, useEffect, useState } from "react";
const { VITE_BASE_URL } = import.meta.env;
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${VITE_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
        console.log(products);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
