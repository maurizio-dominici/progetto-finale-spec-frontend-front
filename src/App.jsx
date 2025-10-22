import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import DefaultLayout from "./layouts/DefaultLayout";
import { GlobalContext, GlobalProvider } from "./context/GlobalContext";
import AllProductsPage from "./pages/AllProductsPage";
import DetailPages from "./pages/DetailPages"; // correggi import DetailPages
import CompareModal from "./components/CompareModal";
import { useContext } from "react";
import FavoritePage from "./pages/FavoritesPage";
import CategorySection from "./components/category-components/CategorySection";

function AppContent() {
  const { isCompareModalOpen, setIsCompareModalOpen } =
    useContext(GlobalContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            {/* Rotte base */}
            <Route index element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Rotte per navigazione */}
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/products/:id" element={<DetailPages />} />
            <Route
              path="/hotels"
              element={<CategorySection category="hotel" title="Hotel" />}
            />
            <Route
              path="/transport"
              element={
                <CategorySection category="trasporto" title="Trasporti" />
              }
            />
            <Route
              path="/tours"
              element={<CategorySection category="tour" title="Tour" />}
            />
            <Route
              path="/flys"
              element={<CategorySection category="volo" title="Voli" />}
            />

            <Route path="/favorites" element={<FavoritePage />} />
          </Route>
        </Routes>
        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
        />
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}
