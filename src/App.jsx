import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { HomePage, ApartmentsPage, SingleApartmentPage, BuildingPage, ErrorPage, GeneralBuildingPage, VirtualPage, FloorPage, WishlistPage } from './pages';
import { ConditionalLayout, Cookies } from './components';
import SvgExtractor from './pages/svg/SvgExtractor';
import FloorSvgExtractor from './pages/svg/FloorSvgExtractor';
import FloorBuildingSvgExtractor from './pages/svg/FloorBuildingSvgExtractor';
import ParkingSvgExtractor from './pages/svg/ParkingSvgExtractor';
import { AuthProvider } from './components/auth/AuthProvider';
import AdminPage from './pages/svg/admin/AdminPage';
import ScrollToTop from './utils/ScrollToTop';

function App() {

  return (
    <Router>
      <ScrollToTop />
      <ConditionalLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/apartments/:id" element={<SingleApartmentPage />} />
          <Route path="/buildings/:id" element={<BuildingPage />} />
          <Route path="/buildings" element={<GeneralBuildingPage />} />
          <Route path="/buildings/:id/floor/:floorId" element={<FloorPage />} />
          <Route path="/360-virtual" element={<VirtualPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route
            path="/admin/*"
            element={
              <AuthProvider>
                <AdminPage />
              </AuthProvider>
            }
          />
          <Route path="/svg-extrator" element={<SvgExtractor />} />
          <Route path="/fsvg-extrator" element={<FloorSvgExtractor />} />
          <Route path="/fbsvg-extrator" element={<FloorBuildingSvgExtractor />} />
          <Route path="/psvg-extrator" element={<ParkingSvgExtractor />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* <Cookies /> */}
      </ConditionalLayout>
    </Router>
  );
}

export default App