import { createContext, useEffect, useState, useMemo } from "react";

const { VITE_BASE_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // '' | 'asc' | 'desc'

  const [selectedForCompare, setSelectedForCompare] = useState([]);

  // Stato per apertura modale confronto
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${VITE_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore di rete");
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (filterByName.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filterByName.toLowerCase())
      );
    }

    if (filterByCategory) {
      filtered = filtered.filter((p) => p.category === filterByCategory);
    }

    if (sortOrder === "asc") {
      filtered = filtered
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      filtered = filtered
        .slice()
        .sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [allProducts, filterByName, filterByCategory, sortOrder]);

  const previewProducts = useMemo(
    () => filteredProducts.slice(0, 9),
    [filteredProducts]
  );

  return (
    <GlobalContext.Provider
      value={{
        allProducts,
        filteredProducts,
        previewProducts,
        loading,
        error,
        filterByName,
        setFilterByName,
        filterByCategory,
        setFilterByCategory,
        sortOrder,
        setSortOrder,
        selectedForCompare,
        setSelectedForCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
