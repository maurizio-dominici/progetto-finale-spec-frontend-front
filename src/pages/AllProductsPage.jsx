import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductCard from "../components/ui/ProductCard";

export default function AllProductsPage() {
  const { allProducts } = useContext(GlobalContext);
  const [filterByName, setFilterByName] = useState("");

  // Filtra i prodotti in base a filterByName (case-insensitive)
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(filterByName.toLowerCase())
  );

  return (
    <div className="container">
      {/* Input per la ricerca */}
      <div className="my-3">
        <input
          type="search"
          className="form-control"
          placeholder="Cerca prodotto per nome..."
          value={filterByName}
          onChange={(e) => setFilterByName(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
