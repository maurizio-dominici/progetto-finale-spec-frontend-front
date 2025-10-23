import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const { VITE_BASE_URL } = import.meta.env;

export default function DetailPages() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {
    selectedForCompare,
    setSelectedForCompare,
    favorites,
    toggleFavorite,
    setIsCompareModalOpen,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!id) return;
    fetch(`${VITE_BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch fallita");
        return res.json();
      })
      .then((data) => setProduct(data.product))
      .catch((err) => console.error("Errore di fetch:", err));
  }, [id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  if (!product) return <div>Caricamento in corso...</div>;

  const isFavorite = favorites.some((p) => p.id === product.id);

  const toggleCompare = () => {
    const isAlreadySelected = selectedForCompare.some(
      (p) => p.id === product.id
    );
    if (isAlreadySelected) {
      setSelectedForCompare((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setSelectedForCompare((prev) => [...prev, product]);
    }
  };

  const isSelected = selectedForCompare.some((p) => p.id === product.id);

  return (
    <div
      className="container my-5 p-4 bg-light rounded shadow-sm"
      style={{ maxWidth: 900 }}
    >
      <div className="d-flex align-items-center justify-content-center mb-3">
        <h1 className="me-3">{product.title}</h1>

        {/* Cuore preferiti */}
        <button
          onClick={() => toggleFavorite(product)}
          className="btn p-0"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label={
            isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
          }
        >
          {isFavorite ? (
            <i
              className="bi bi-heart-fill text-danger"
              style={{ fontSize: "1.8rem" }}
            ></i>
          ) : (
            <i className="bi bi-heart" style={{ fontSize: "1.8rem" }}></i>
          )}
        </button>
      </div>

      {/* Pulsanti confronto */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          onClick={toggleCompare}
          className={`btn ${isSelected ? "btn-danger" : "btn-primary"}`}
        >
          {isSelected ? "Rimuovi dal confronto" : "Confronta"}
        </button>

        {selectedForCompare.length >= 2 && (
          <button
            className="btn btn-outline-secondary"
            disabled={selectedForCompare.length < 2}
            onClick={() => setIsCompareModalOpen(true)}
          >
            Visualizza confronto ({selectedForCompare.length})
          </button>
        )}
      </div>

      {/* Descrizione e dettagli */}
      <div>
        <h4>Descrizione</h4>
        <p>{product.description || "Nessuna descrizione disponibile."}</p>

        <h5>Dettagli</h5>
        <ul>
          <li>
            <strong>Categoria:</strong> {product.category}
          </li>
          <li>
            <strong>Prezzo:</strong> €{product.price?.toFixed(2) ?? "N/A"}
          </li>
          {product.location && (
            <li>
              <strong>Location:</strong> {product.location}
            </li>
          )}
          {product.durationDays !== undefined && (
            <li>
              <strong>Durata:</strong> {product.durationDays} giorno
              {product.durationDays !== 1 ? "i" : ""}
            </li>
          )}
          {product.transportation && (
            <li>
              <strong>Trasporto:</strong> {product.transportation}
            </li>
          )}
          <li>
            <strong>Valutazione:</strong>
            {product.rating !== undefined ? (
              <>{renderRatingStars(product.rating)}</>
            ) : (
              <span>Nessuna valutazione</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
