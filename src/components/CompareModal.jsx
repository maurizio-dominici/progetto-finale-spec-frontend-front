import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function CompareModal({ isOpen, onClose }) {
  const { selectedForCompare, setSelectedForCompare } =
    useContext(GlobalContext);

  if (!isOpen) return null;

  const removeProduct = (id) => {
    setSelectedForCompare((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confronto prodotti</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {selectedForCompare.length < 2 ? (
              <p className="text-center text-muted">
                Seleziona almeno 2 prodotti per confrontarli.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Caratteristica</th>
                      {selectedForCompare.map((p) => (
                        <th key={p.id}>
                          {p.title}
                          <br />
                          <button
                            className="btn btn-sm btn-outline-danger mt-2"
                            onClick={() => removeProduct(p.id)}
                          >
                            Rimuovi
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Categoria</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>{p.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Prezzo</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>€{p.price?.toFixed(2) ?? "N/A"}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Durata</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>
                          {p.durationDays
                            ? `${p.durationDays} giorno${
                                p.durationDays > 1 ? "i" : ""
                              }`
                            : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Trasporto</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>{p.transportation || "N/A"}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Valutazione</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>{p.rating ? `${p.rating}/5` : "N/A"}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Descrizione</td>
                      {selectedForCompare.map((p) => (
                        <td key={p.id}>{p.description || "-"}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
