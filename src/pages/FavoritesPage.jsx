import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function FavoritePage() {
  const { favorites, toggleFavorite } = useContext(GlobalContext);

  if (favorites.length === 0) {
    return (
      <div className="container my-5">
        <h1>Preferiti</h1>
        <p>Non hai ancora aggiunto prodotti ai preferiti.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1>Preferiti</h1>
      <div className="row">
        {favorites.map((product, index) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div
                className={`card-img-top bg-style-1`}
                style={{ height: "180px" }}
              ></div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {product.title}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="btn p-0 ms-2"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Rimuovi dai preferiti"
                  >
                    <i
                      className="bi bi-heart-fill text-danger"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
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
        ))}
      </div>
    </div>
  );
}
