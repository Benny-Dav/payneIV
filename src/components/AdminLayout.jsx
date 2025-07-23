import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const navLinks = [
    { to: "/admin/homepage", label: "Homepage" },
    { to: "/admin/portfolio", label: "Portfolio" },
    { to: "/admin/contact", label: "Contact Info" },
    { to: "/admin/social", label: "Social Links" },
    { to: "/admin/seo", label: "SEO Meta" },
    // Add more links as needed
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col py-8 px-4">
        <span className="text-2xl font-bold mb-8 tracking-wide">Admin Dashboard</span>
        <nav className="flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
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
      {/* Main content area */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}
