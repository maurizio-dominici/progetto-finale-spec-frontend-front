import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "../ui/ProductCard";

export default function ProductPreview() {
  const { previewProducts } = useContext(GlobalContext);

  return (
    <div className="row">
      {previewProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
