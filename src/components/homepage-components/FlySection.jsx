import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";
import ProductFilterNoCategory from "../ProductFilterNoCategory";

export default function TransportSection() {
  const { allProducts, filterByName, sortOrder } = useContext(GlobalContext);

  const flyProducts = useMemo(() => {
    return allProducts.filter(
      (product) => product.category.toLowerCase() === "volo"
    );
  }, [allProducts]);

  // Applica filtro testo + ordinamento su prodotti volo
  const filteredProducts = useMemo(() => {
    let filtered = flyProducts;

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
  }, [flyProducts, filterByName, sortOrder]);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Voli</h1>

      {/* Usa il filtro senza categoria */}
      <ProductFilterNoCategory />

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p className="text-center text-danger">
            Nessun prodotto disponibile per la categoria volo.
          </p>
        )}
      </div>
    </div>
  );
}
