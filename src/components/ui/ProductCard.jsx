import { Link } from "react-router-dom";

export default function ProductCard({ product, index }) {
  // Classe CSS alternata in base a index modulo 3
  const colorClass = ["bg-style-1", "bg-style-2", "bg-style-3"][index % 3];

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div
          className={`card-img-top ${colorClass}`}
          style={{ height: "180px" }}
        ></div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <div className="mt-auto d-flex align-items-center">
            <span className="fw-bold">{product.category}</span>
            <Link
              to={`/products/${product.id}`}
              className="btn btn-primary btn-sm ms-auto"
            >
              Dettaglio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
