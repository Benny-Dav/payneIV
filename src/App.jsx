import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import BookSession from './pages/BookSession.jsx'
import Admin from './pages/Admin.jsx'
import PortfolioAdmin from './pages/admin/PortfolioAdmin.jsx'
import HomepageAdmin from './pages/admin/HomepageAdmin.jsx'
import AdminLayout from './components/AdminLayout.jsx';
import ContactInfoAdmin from './pages/admin/ContactInfoAdmin.jsx';
import SocialLinksAdmin from './pages/admin/SocialLinksAdmin.jsx';
import SeoMetaAdmin from './pages/admin/SeoMetaAdmin.jsx';

function App() {
  return (
    <Routes>
      {/* Public site routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book" element={<BookSession />} />
      </Route>

      {/* Admin routes use AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="homepage" replace />} />
        <Route path="homepage" element={<HomepageAdmin />} />
        <Route path="portfolio" element={<PortfolioAdmin />} />
        <Route path="contact" element={<ContactInfoAdmin />} />
        <Route path="social" element={<SocialLinksAdmin />} />
        <Route path="seo" element={<SeoMetaAdmin />} />
        {/* ...other admin routes */}
      </Route>
    </Routes>
  );
}

export default App
