import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";
import ProductFilterNoCategory from "../ProductFilterNoCategory";

export default function TourSection() {
  const { allProducts, filterByName, sortOrder } = useContext(GlobalContext);

  // Filtro prodotti solo categoria trasporto
  const tourProducts = useMemo(() => {
    return allProducts.filter(
      (product) => product.category.toLowerCase() === "tour"
    );
  }, [allProducts]);

  // Applica filtro testo + ordinamento su prodotti tour
  const filteredProducts = useMemo(() => {
    let filtered = tourProducts;

    if (filterByName.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filterByName.toLowerCase())
      );
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
  }, [tourProducts, filterByName, sortOrder]);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Tour</h1>

      {/* Usa il filtro senza categoria */}
      <ProductFilterNoCategory />

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p className="text-center text-danger">
            Nessun prodotto disponibile per la categoria Tour.
          </p>
        )}
      </div>
    </div>
  );
}
