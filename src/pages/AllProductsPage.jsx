import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function AllProductsPage() {
  const { products } = useContext(GlobalContext);
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={"../../src/assets/img/backgroundCard.jpg"}
                alt={product.title}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <div className="mt-auto">
                  <span className="fw-bold">{product.category}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary btn-sm mt-3"
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
