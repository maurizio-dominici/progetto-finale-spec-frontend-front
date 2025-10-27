import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ui/ProductCard";

export default function AllProductsPage() {
  const { filteredProducts, loading, error, resetFilters } =
    useContext(GlobalContext);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center py-3">Tutti i prodotti</h1>

      <ProductFilter />

      {loading && (
        <p role="status" className="text-center text-primary">
          Caricamento prodotti...
        </p>
      )}

      {error && (
        <p role="alert" className="text-center text-danger">
          Errore nel caricamento: {error.message}
        </p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <>
          <p className="text-center text-danger">
            Nessun prodotto rispetta queste caratteristiche.
          </p>
          <div className="text-center">
            <button onClick={resetFilters} className="btn btn-secondary">
              Resetta filtri
            </button>
          </div>
        </>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="row">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
