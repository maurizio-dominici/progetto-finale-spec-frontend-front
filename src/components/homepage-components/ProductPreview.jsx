import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ProductPreview() {
  const { products } = useContext(GlobalContext);

  // Prendo solo i primi 3 prodotti per anteprima
  const previewProducts = products.slice(0, 3);

  return (
    <div className="row">
      {previewProducts.map((product) => (
        <div key={product.id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.title}
              className="card-img-top"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text text-truncate">{product.description}</p>
              <div className="mt-auto">
                <span className="fw-bold">€{product.price}</span>
                {/* Puoi aggiungere un pulsante link a dettaglio */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
