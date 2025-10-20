import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function TourSection() {
  const { allProducts } = useContext(GlobalContext);

  // Filtra solo i prodotti con categoria "Tour" (case-insensitive)
  const tourProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === "tour"
  );

  return (
    <div className="container my-4">
      <h1 className="mb-4">Tour Section</h1>
      <div className="row">
        {tourProducts.length > 0 ? (
          tourProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p>Nessun prodotto disponibile per la categoria Tour.</p>
        )}
      </div>
    </div>
  );
}
