import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Benefits from "../components/homepage-components/Benefits";
import HeroSection from "../components/homepage-components/HeroSection";
import ProductPreview from "../components/homepage-components/ProductPreview";
import ProductFilter from "../components/ProductFilter";

export default function Homepage() {
  const { filteredProducts, loading, error } = useContext(GlobalContext);

  return (
    <>
      <HeroSection />
      <section className="products py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">I nostri prodotti migliori</h2>
          <ProductFilter />

          {loading && <p>Caricamento prodotti...</p>}
          {error && <p>Errore nel caricamento: {error.message}</p>}

          {!loading && filteredProducts.length === 0 ? (
            <p className="text-center text-danger">
              Nessun prodotto rispetta queste caratteristiche.
            </p>
          ) : (
            <ProductPreview />
          )}
        </div>
      </section>
      <Benefits />
    </>
  );
}
