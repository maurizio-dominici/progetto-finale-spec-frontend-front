import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "../assets/css/index.css";

export default function Navbar() {
  const { selectedForCompare, isCompareModalOpen, setIsCompareModalOpen } =
    useContext(GlobalContext);

  const handleCompareClick = () => {
    if (selectedForCompare.length >= 2) {
      setIsCompareModalOpen(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Web Travel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-house-door-fill"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/all-products"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Tutti i prodotti
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Hotel
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/tours"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Tour
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/flys"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Voli
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/transport"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Trasporti
              </NavLink>
            </li>
          </ul>

          {/* Link testuale Confronta */}
          <span
            role="button"
            tabIndex={0}
            onClick={handleCompareClick}
            className={`nav-link compare-link ${
              selectedForCompare.length < 2 ? "disabled" : ""
            }`}
            title={
              selectedForCompare.length < 2
                ? "Seleziona almeno 2 prodotti per confrontare"
                : "Visualizza prodotti confrontati"
            }
          >
            Confronta ({selectedForCompare.length})
          </span>
        </div>
      </div>
    </nav>
  );
}
