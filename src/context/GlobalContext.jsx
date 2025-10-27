import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

const { VITE_BASE_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filterByName, setFilterByName] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedForCompare, setSelectedForCompare] = useState(() => {
    const saved = localStorage.getItem("selectedForCompare");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareSidebarOpen, setIsCompareSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const detailsCacheRef = useRef({});

  useEffect(() => {
    let active = true;
    async function fetchAllData() {
      try {
        const [productsRes, reviewsRes] = await Promise.all([
          fetch(`${VITE_BASE_URL}/products`),
          fetch(`${VITE_BASE_URL}/reviews`),
        ]);
        if (!productsRes.ok || !reviewsRes.ok)
          throw new Error("Errore di rete");
        const [products, reviews] = await Promise.all([
          productsRes.json(),
          reviewsRes.json(),
        ]);
        setAllProducts(products);
        const detailPromises = reviews.map((r) =>
          fetch(`${VITE_BASE_URL}/reviews/${r.id}`).then((res) => res.json())
        );
        const detailsArray = await Promise.all(detailPromises);
        reviews.forEach((r, i) => {
          detailsCacheRef.current[r.id] = detailsArray[i].review
            ? detailsArray[i].review
            : detailsArray[i];
        });
        if (active) {
          setReviews(reviews);
        }
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchAllData();
    return () => {
      active = false;
    };
  }, []);

  const getReviewDetails = useCallback(async (id) => {
    if (detailsCacheRef.current[id]) return detailsCacheRef.current[id];
    const res = await fetch(`${VITE_BASE_URL}/reviews/${id}`);
    if (!res.ok) throw new Error("Errore fetch dettaglio recensione");
    const data = await res.json();
    detailsCacheRef.current[id] = data.review ? data.review : data;
    return detailsCacheRef.current[id];
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

  const resetFilters = useCallback(() => {
    setFilterByName("");
    setFilterByCategory("");
    setSortOrder("");
  }, []);

  const toggleFavorite = useCallback((product) => {
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
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  useEffect(() => {
    localStorage.setItem(
      "selectedForCompare",
      JSON.stringify(selectedForCompare)
    );
  }, [selectedForCompare]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <GlobalContext.Provider
      value={{
        allProducts,
        reviews,
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
        resetFilters,
        selectedForCompare,
        setSelectedForCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isCompareSidebarOpen,
        setIsCompareSidebarOpen,
        favorites,
        toggleFavorite,
        clearFavorites,
        getReviewDetails,
        detailsCache: detailsCacheRef.current,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
