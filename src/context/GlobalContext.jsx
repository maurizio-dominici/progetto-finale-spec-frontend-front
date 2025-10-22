import { createContext, useEffect, useState, useMemo } from "react";

const { VITE_BASE_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [detailsCache, setDetailsCache] = useState({}); // cache dettagli recensioni persistente nello stato

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // fetch prodotti
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

  // fetch recensioni base
  useEffect(() => {
    fetch(`${VITE_BASE_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  // funzione per ottenere dettagli recensione con caching in stato
  const getReviewDetails = async (id) => {
    if (detailsCache[id]) {
      return detailsCache[id];
    }
    const res = await fetch(`${VITE_BASE_URL}/reviews/${id}`);
    if (!res.ok) throw new Error("Errore fetch dettaglio recensione");
    const data = await res.json();
    setDetailsCache((prev) => ({ ...prev, [id]: data.review }));
    return data;
  };

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

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      let updated;
      if (exists) {
        updated = prev.filter((p) => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const clearFavorites = () => setFavorites([]);

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
        favorites,
        toggleFavorite,
        clearFavorites,
        reviews,
        setReviews,
        getReviewDetails,
        detailsCache,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
