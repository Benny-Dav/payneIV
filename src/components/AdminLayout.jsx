import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { to: "/admin/homepage", label: "Homepage" },
    { to: "/admin/portfolio", label: "Portfolio" },
    { to: "/admin/contact", label: "Contact Info" },
    { to: "/admin/social", label: "Social Links" },
    { to: "/admin/seo", label: "SEO Meta" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile drawer button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open admin menu"
      >
        ☰
      </button>

      {/* Sidebar / Drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col py-8 px-4 z-40
          transform transition-transform duration-300
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-64 md:flex
        `}
        style={{ minWidth: '16rem' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close admin menu"
        >
          ×
        </button>
        <span className="text-2xl font-bold mb-8 tracking-wide">Admin Dashboard</span>
        <nav className="flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setDrawerOpen(false)}
              className={`px-3 py-2 rounded transition ${
                location.pathname === link.to
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Link to="/" className="hover:underline text-gray-300">← Back to Site</Link>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}
