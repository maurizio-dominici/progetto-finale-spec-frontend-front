import Benefits from "../components/homepage-components/Benefits";
import HeroSection from "../components/homepage-components/HeroSection";
import ProductPreview from "../components/homepage-components/ProductPreview";

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
      <Benefits />
    </>
  );
}
