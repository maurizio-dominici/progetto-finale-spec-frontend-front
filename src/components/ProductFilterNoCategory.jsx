import { useContext, useState, useCallback, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductFilterNoCategory() {
  const {
    filterByName,
    setFilterByName,
    sortOrder,
    setSortOrder,
    resetFilters,
  } = useContext(GlobalContext);

  const [localSearch, setLocalSearch] = useState(filterByName);
  const [isOpen, setIsOpen] = useState(false);

  //  Per sincronizzare il campo ricerca locale (localSearch) ogni volta che cambia (filterByName)
  useEffect(() => {
    setLocalSearch(filterByName);
  }, [filterByName]);

  const debounce = useCallback((func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  }, []);

  const debouncedSetFilterByName = useCallback(
    debounce((value) => setFilterByName(value), 500),
    [setFilterByName, debounce]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetFilterByName(value);
  };

  const handleSortChange = (order) => {
    setSortOrder(sortOrder === order ? "" : order);
  };

  return (
    <div className="dropdown mb-4">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filtri
      </button>
      <div
        className={`dropdown-menu p-3${isOpen ? " show" : ""}`}
        style={{ minWidth: "300px" }}
      >
        <label htmlFor="titleFilter" className="form-label">
          Cerca per titolo
        </label>
        <input
          id="titleFilter"
          type="text"
          className="form-control mb-3"
          placeholder="Cerca prodotto..."
          value={localSearch}
          onChange={handleInputChange}
        />

        <label className="form-label">Ordina per Titolo</label>
        <div className="btn-group" role="group" aria-label="Sort order">
          <button
            type="button"
            className={`btn btn-outline-primary${
              sortOrder === "asc" ? " active" : ""
            }`}
            onClick={() => handleSortChange("asc")}
          >
            A → Z
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary${
              sortOrder === "desc" ? " active" : ""
            }`}
            onClick={() => handleSortChange("desc")}
          >
            Z → A
          </button>
        </div>

        <button
          className="btn btn-outline-danger mt-3 w-100"
          onClick={resetFilters}
        >
          Reset filtri
        </button>
      </div>
    </div>
  );
}
