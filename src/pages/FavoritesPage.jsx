import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import "../assets/css/index.css";

export default function FavoritePage() {
  const { favorites, toggleFavorite, clearFavorites } =
    useContext(GlobalContext);

  if (favorites.length === 0) {
    return (
      <div className="container favorite-container">
        <h1 className="favorite-title">Preferiti</h1>
        <p>Non hai ancora aggiunto prodotti ai preferiti.</p>
      </div>
    );
  }

  return (
    <div className="container favorite-container">
      <h1 className="favorite-title">Preferiti</h1>

      <button
        onClick={clearFavorites}
        className="btn btn-danger favorite-clear-btn"
        aria-label="Rimuovi tutti i preferiti"
      >
        Rimuovi tutti i preferiti
      </button>

      <div className="row">
        {favorites.map((product, index) => (
          <div key={product.id} className="col-md-4 favorite-card-col">
            <div className="card h-100">
              <div className="card-img-top favorite-card-img bg-style-1"></div>
              <div className="card-body favorite-card-body">
                <h5 className="card-title favorite-card-title">
                  {product.title}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="favorite-favorite-btn"
                    aria-label="Rimuovi dai preferiti"
                  >
                    <i className="bi bi-heart-fill text-danger favorite-favorite-icon"></i>
                  </button>
                </h5>
                <p className="card-text favorite-card-text">
                  {product.description}
                </p>
                <div className="favorite-card-footer">
                  <span className="fw-bold">{product.category}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary btn-sm btn-detail"
                  >
                    Dettaglio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
