import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function TransportSection() {
  const { allProducts } = useContext(GlobalContext);

  // Filtra solo i prodotti con categoria "Transport" (case-insensitive)
  const hotelProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === "trasporto"
  );

  return (
    <div className="container my-4">
      <h1 className="mb-4">Hotel</h1>
      <div className="row">
        {hotelProducts.length > 0 ? (
          hotelProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p>Nessun prodotto disponibile per la categoria Hotel.</p>
        )}
      </div>
    </div>
  );
}
