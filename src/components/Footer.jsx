export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Sezione Contatti */}
          <div className="col-md-4 mb-3">
            <h5>Contattaci</h5>
            <p>
              Email:{" "}
              <a href="mailto:info@travelwebsite.com" className="text-light">
                info@travelwebsite.com
              </a>
            </p>
            <p>
              Telefono:{" "}
              <a href="tel:+390123456789" className="text-light">
                +39 012 345 6789
              </a>
            </p>
            <p>Indirizzo: Via Roma 123, Milano, Italia</p>
          </div>

          {/* Sezione Link Utili */}
          <div className="col-md-4 mb-3">
            <h5>Link Utili</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-products" className="text-light">
                  Prodotti
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-light">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Sezione Social Media */}
          <div className="col-md-4 mb-3">
            <h5>Seguici</h5>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-twitter fs-4"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-light"
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} Travel Website. Tutti i diritti
          riservati.
        </p>
      </div>
    </footer>
  );
}
