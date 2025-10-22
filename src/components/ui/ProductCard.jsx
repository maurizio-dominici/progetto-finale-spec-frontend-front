import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export default React.memo(function ProductCard({ product, index }) {
  const colorClass = ["bg-style-1", "bg-style-2", "bg-style-3"][index % 3];
  const { favorites, toggleFavorite } = useContext(GlobalContext);

  const isFavorite = favorites.some((p) => p.id === product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div
          className={`card-img-top ${colorClass}`}
          style={{ height: "180px" }}
        ></div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            {product.title}
            <button
              onClick={handleFavoriteClick}
              className="btn p-0 ms-2"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label={
                isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
              }
            >
              {isFavorite ? (
                <i
                  className="bi bi-heart-fill text-danger"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              ) : (
                <i className="bi bi-heart" style={{ fontSize: "1.3rem" }}></i>
              )}
            </button>
          </h5>
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
});
