import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ui/ProductCard";

export default function AllProductsPage() {
  const { filteredProducts, loading, error } = useContext(GlobalContext);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Tutti i prodotti</h2>

      <ProductFilter />

      {loading && <p>Caricamento prodotti...</p>}
      {error && <p>Errore nel caricamento: {error.message}</p>}

      {!loading && filteredProducts.length === 0 ? (
        <p className="text-center text-danger">
          Nessun prodotto rispetta queste caratteristiche.
        </p>
      ) : (
        <div className="row">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
