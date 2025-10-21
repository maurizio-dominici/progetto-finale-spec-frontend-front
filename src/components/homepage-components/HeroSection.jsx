import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section bg-light text-center py-5">
      <div className="container">
        <h1 className="display-4 mb-3">Benvenuto in Web Travel</h1>
        <p className="lead mb-4">
          Scopri i nostri prodotti esclusivi e le migliori offerte per te.
        </p>
        <Link to="/all-products" className="btn btn-primary btn-lg">
          Scopri tutti i prodotti
        </Link>
      </div>
    </section>
  );
}
