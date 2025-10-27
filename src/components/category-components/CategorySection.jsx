import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";
import ProductFilterNoCategory from "../ProductFilterNoCategory";

export default function CategorySection({ category, title }) {
  const { allProducts, filterByName, sortOrder, loading, error } =
    useContext(GlobalContext);

  const categoryProducts = useMemo(
    () =>
      allProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      ),
    [allProducts, category]
  );

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

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
  }, [categoryProducts, filterByName, sortOrder]);

  if (loading) {
    return (
      <p aria-live="polite" className="text-center my-5">
        Caricamento prodotti...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-center text-danger my-5">
        Errore nel caricamento: {error.message}
      </p>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center py-5">{title}</h1>

      <ProductFilterNoCategory />

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p aria-live="polite" className="text-center text-danger">
            Nessun prodotto disponibile per la categoria {title}.
          </p>
        )}
      </div>
    </div>
  );
}
