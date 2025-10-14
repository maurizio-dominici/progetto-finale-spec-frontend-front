import FlySection from "../components/homepage-components/FlySection";
import HeroSection from "../components/homepage-components/HeroSection";
import HotelSection from "../components/homepage-components/HotelSection";
import ProductPreview from "../components/homepage-components/ProductPreview";
import TourSection from "../components/homepage-components/TourSection";
import TransportSection from "../components/homepage-components/TransportSection";

export default function Homepage() {
  return (
    <>
      <HeroSection />
      <section className="products py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">I nostri prodotti migliori</h2>
          <ProductPreview />
        </div>
      </section>
      <section className="benefits py-5">
        <div className="container text-center">
          <h2>Perché scegliere noi</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <i className="bi bi-star-fill display-4 text-primary"></i>
              <h4>Qualità Garantita</h4>
              <p>Prodotti selezionati e testati per te.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-speedometer2 display-4 text-primary"></i>
              <h4>Consegna Veloce</h4>
              <p>Spedizioni rapide e tracciabili.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-headset display-4 text-primary"></i>
              <h4>Assistenza H24</h4>
              <p>Supporto pronto e disponibile sempre.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
