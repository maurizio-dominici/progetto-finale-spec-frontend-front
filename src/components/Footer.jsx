export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
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
            </ul>
          </div>

          {/* Sezione Social Media con icone bootstrap statiche senza link */}
          <div className="col-md-4 mb-3 d-flex align-items-center justify-content-start gap-3">
            <i className="bi bi-facebook fs-4" aria-label="Facebook"></i>
            <i className="bi bi-twitter fs-4" aria-label="Twitter"></i>
            <i className="bi bi-instagram fs-4" aria-label="Instagram"></i>
            <i className="bi bi-linkedin fs-4" aria-label="LinkedIn"></i>
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
