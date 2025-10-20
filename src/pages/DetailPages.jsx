import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const { VITE_BASE_URL } = import.meta.env;

export default function DetailPages() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${VITE_BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => setProduct(data.product))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  // Scegli uno stile di sfondo fra tre, basato su product.id modulo 3
  const bgClass = ["bg-style-1", "bg-style-2", "bg-style-3"][product.id % 3];

  return (
    <div
      className={`container my-4 p-4 rounded shadow-sm ${bgClass} text-dark`}
    >
      <h1 className="mb-3">{product.title}</h1>

      {/* Immagine principale */}
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className="img-fluid rounded mb-4 shadow"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      ) : (
        <div
          className="bg-secondary text-white d-flex align-items-center justify-content-center rounded mb-4"
          style={{ height: 400 }}
        >
          <span>Nessuna immagine disponibile</span>
        </div>
      )}

      {/* Descrizione e dettagli principali */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h4>Descrizione</h4>
          <p>{product.description}</p>

          <h5>Dettagli</h5>
          <ul className="list-unstyled">
            <li>
              <strong>Categoria:</strong> {product.category}
            </li>
            <li>
              <strong>Prezzo:</strong> €
              {product.price !== undefined && typeof product.price === "number"
                ? product.price.toFixed(2)
                : "N/A"}
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
                <strong>Tipologia Trasporto:</strong> {product.transportation}
              </li>
            )}
            {product.availableFrom && (
              <li>
                <strong>Disponibile da:</strong>{" "}
                {new Date(product.availableFrom).toLocaleDateString()}
              </li>
            )}
            {product.availableTo && (
              <li>
                <strong>Disponibile fino a:</strong>{" "}
                {new Date(product.availableTo).toLocaleDateString()}
              </li>
            )}
            {product.rating !== undefined && (
              <li>
                <strong>Valutazione:</strong> {product.rating} / 5
              </li>
            )}
            {product.cancellationPolicy && (
              <li>
                <strong>Politica Cancellazione:</strong>{" "}
                {product.cancellationPolicy}
              </li>
            )}
          </ul>
        </div>

        {/* Amenities */}
        <div className="col-md-4">
          <h4>Servizi Inclusi</h4>
          {product.amenities && product.amenities.length > 0 ? (
            <ul>
              {product.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          ) : (
            <p>Nessun servizio incluso.</p>
          )}
        </div>
      </div>

      {/* Pulsante per prenotare o altri CTA */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-success btn-lg shadow">Prenota Ora</button>
      </div>
    </div>
  );
}
