import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function ProductPreview() {
  const { previewProducts } = useContext(GlobalContext);

  if (previewProducts.length === 0) {
    return (
      <p className="text-center text-muted mt-4">Nessun risultato trovato</p>
    );
  }

  return (
    <div className="row">
      {previewProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
