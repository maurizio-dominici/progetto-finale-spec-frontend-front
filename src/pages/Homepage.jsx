import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Benefits from "../components/homepage-components/Benefits";
import HeroSection from "../components/homepage-components/HeroSection";
import ProductPreview from "../components/homepage-components/ProductPreview";
import ProductFilter from "../components/ProductFilter";
import Spinner from "../components/ui/Spinner";

export default function Homepage() {
  const { filteredProducts, loading, error } = useContext(GlobalContext);

  if (loading) return <Spinner />;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <>
      {/* HeroSection con sfondo chiaro */}
      <section className="hero-section py-5">
        <HeroSection />
      </section>

      {/* Sezione prodotti con sfumatura da hero-section a prodotti */}
      <section className="products section-sfumata py-5">
        <div className="container">
          <h2 className="mb-4 text-center">I nostri prodotti migliori</h2>
          <ProductFilter />

          {loading && <p>Caricamento prodotti...</p>}
          {error && (
            <p className="text-danger text-center">
              Errore nel caricamento: {error.message}
            </p>
          )}

          {!loading && filteredProducts.length === 0 ? (
            <p className="text-center text-danger">
              Nessun prodotto rispetta queste caratteristiche.
            </p>
          ) : (
            <ProductPreview />
          )}
        </div>
      </section>

      {/* Sezione Benefits con sfondo sfumato */}
      <section className="section-sfumata py-5">
        <Benefits />
      </section>
    </>
  );
}
