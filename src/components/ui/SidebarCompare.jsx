import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "../../assets/css/index.css";

export default function SidebarCompare() {
  const {
    selectedForCompare,
    isCompareSidebarOpen,
    setIsCompareSidebarOpen,
    setIsCompareModalOpen,
    setSelectedForCompare,
  } = useContext(GlobalContext);

  const handleStartCompare = () => {
    if (selectedForCompare.length >= 2) {
      setIsCompareModalOpen(true);
      setIsCompareSidebarOpen(false);
    }
  };

  const handleRemove = (id) => {
    setSelectedForCompare((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={`sidebar-compare ${isCompareSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center mb-3">
        <h5>Elementi in confronto</h5>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setIsCompareSidebarOpen(false)}
          aria-label="Chiudi sidebar confronto"
        >
          Chiudi
        </button>
      </div>

      {selectedForCompare.length > 0 ? (
        selectedForCompare.map((item) => (
          <div
            key={item.id}
            className="sidebar-item d-flex align-items-center justify-content-between mb-2"
          >
            <span className="flex-grow-1 text-truncate">{item.title}</span>
            <button
              aria-label={`Rimuovi ${item.title} dal confronto`}
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => handleRemove(item.id)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ))
      ) : (
        <p className="text-muted">Nessun elemento selezionato.</p>
      )}

      <button
        className="btn btn-primary mt-3 w-100"
        disabled={selectedForCompare.length < 2}
        onClick={handleStartCompare}
        title={
          selectedForCompare.length < 2
            ? "Seleziona almeno 2 prodotti per abilitare il confronto"
            : "Avvia confronto"
        }
      >
        Confronta ({selectedForCompare.length})
      </button>
    </div>
  );
}
