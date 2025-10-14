import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import DefaultLayout from "./layouts/DefaultLayout";
import HotelSection from "./components/homepage-components/HotelSection";
import TourSection from "./components/homepage-components/TourSection";
import FlySection from "./components/homepage-components/FlySection";
import TransportSection from "./components/homepage-components/TransportSection";
import { GlobalProvider } from "./context/GlobalContext";
import AllProductsPage from "./pages/AllProductsPage";
import DeatailPages from "./pages/DetailPages";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            {/* Rotte base */}
            <Route index element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* Rotte per navigazione  */}
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/products/:id" element={<DeatailPages />} />
            <Route path="/hotels" element={<HotelSection />} />
            <Route path="/tours" element={<TourSection />} />
            <Route path="/flys" element={<FlySection />} />
            <Route path="/transport" element={<TransportSection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
