import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CompareModal from "../components/CompareModal";

const { VITE_BASE_URL } = import.meta.env;

export default function DetailPages() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { selectedForCompare, setSelectedForCompare } =
    useContext(GlobalContext);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

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

  if (!product) return <div>Caricamento in corso...</div>;

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
      <h1 className="mb-4 text-center">{product.title}</h1>

      {/* Pulsanti Confronta + Visualizza Confronto */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          onClick={toggleCompare}
          className={`btn ${isSelected ? "btn-danger" : "btn-primary"}`}
        >
          {isSelected ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setIsCompareOpen(true)}
          disabled={selectedForCompare.length < 2}
        >
          Visualizza confronto ({selectedForCompare.length})
        </button>
      </div>

      {/* Sezione dettagli prodotto */}
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
          {product.rating !== undefined && (
            <li>
              <strong>Valutazione:</strong> {product.rating}/5
            </li>
          )}
        </ul>
      </div>

      {/* Pulsante prenotazione */}
      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg shadow">Prenota ora</button>
      </div>

      {/* Modale per il confronto */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
}
