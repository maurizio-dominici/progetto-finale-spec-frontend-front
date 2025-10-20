import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function TransportSection() {
  const { allProducts } = useContext(GlobalContext);

  // Filtra solo i prodotti con categoria "Transport" (case-insensitive)
  const transportProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === "trasporto"
  );

  return (
    <div className="container my-4">
      <h1 className="mb-4">Trasporti</h1>
      <div className="row">
        {transportProducts.length > 0 ? (
          transportProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p>Nessun prodotto disponibile per la categoria Trasporti.</p>
        )}
      </div>
    </div>
  );
}
