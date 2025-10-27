import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import ReviewsList from "../ui/ReviewsList";
import { useContext } from "react";

export default function HeroSection() {
  const { reviews } = useContext(GlobalContext);

  return (
    <section className="hero-section text-center py-5">
      <div className="container">
        <h1 className="display-4 mb-3">Benvenuto in Web Travel</h1>
        <p className="lead mb-4">
          Scopri i nostri prodotti esclusivi e le migliori offerte per te.
        </p>
        <Link to="/all-products" className="btn btn-primary btn-lg mb-4">
          Scopri tutti i prodotti
        </Link>

        {reviews && reviews.length > 0 && <ReviewsList reviews={reviews} />}
      </div>
    </section>
  );
}
