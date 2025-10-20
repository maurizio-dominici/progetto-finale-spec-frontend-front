import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function TransportSection() {
  const { allProducts } = useContext(GlobalContext);

  // Filtra solo i prodotti con categoria "Transport" (case-insensitive)
  const flyProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === "volo"
  );

  return (
    <div className="container my-4">
      <h1 className="mb-4">Voli</h1>
      <div className="row">
        {flyProducts.length > 0 ? (
          flyProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p>Nessun prodotto disponibile per la categoria Volo.</p>
        )}
      </div>
    </div>
  );
}
