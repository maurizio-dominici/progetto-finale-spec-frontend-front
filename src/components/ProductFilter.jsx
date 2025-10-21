import { useContext, useState, useCallback, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductFilter() {
  const {
    allProducts,
    filterByName,
    setFilterByName,
    filterByCategory,
    setFilterByCategory,
    sortOrder,
    setSortOrder,
  } = useContext(GlobalContext);

  const [localSearch, setLocalSearch] = useState(filterByName);
  const [isOpen, setIsOpen] = useState(false);

  const debounce = useCallback((func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  const debouncedSetFilterByName = useCallback(
    debounce((value) => {
      setFilterByName(value);
    }, 500),
    [setFilterByName, debounce]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetFilterByName(value);
  };

  const handleCategoryChange = (e) => setFilterByCategory(e.target.value);

  const handleSortChange = (order) => {
    setSortOrder(sortOrder === order ? "" : order);
  };

  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category))).filter(
      Boolean
    );
  }, [allProducts]);

  const resetFilters = () => {
    setFilterByName("");
    setLocalSearch("");
    setFilterByCategory("");
    setSortOrder("");
  };

  return (
    <div className="dropdown mb-4">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
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

        <label htmlFor="categoryFilter" className="form-label">
          Filtra per categoria
        </label>
        <select
          id="categoryFilter"
          className="form-select mb-3"
          value={filterByCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
