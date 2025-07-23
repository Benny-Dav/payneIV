import React, { useState } from 'react';
import HomepageAdmin from './admin/HomepageAdmin';
import PortfolioAdmin from './admin/PortfolioAdmin';
import ContactInfoAdmin from './admin/ContactInfoAdmin';
import SocialLinksAdmin from './admin/SocialLinksAdmin';
import SeoMetaAdmin from './admin/SeoMetaAdmin';

const sections = [
  { label: 'Homepage', key: 'homepage' },
  // { label: 'About', key: 'about' }, // Hidden for now
  // { label: 'Services', key: 'services' }, // Hidden for now
  { label: 'Portfolio', key: 'portfolio' },
  { label: 'Contact Info', key: 'contact' },
  { label: 'Social Links', key: 'social' },
  { label: 'SEO/Meta', key: 'seo' },
];

const Admin = () => {
  const [activeSection, setActiveSection] = useState('homepage');

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col py-8 px-4">
        <h2 className="text-2xl font-playfair mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {sections.map(section => (
            <button
              key={section.key}
              className={`text-left px-4 py-2 rounded transition-colors duration-200 ${
                activeSection === section.key ? 'bg-white text-black' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeSection === 'homepage' && <HomepageAdmin />}
        {activeSection === 'portfolio' && <PortfolioAdmin />}
        {activeSection === 'contact' && <ContactInfoAdmin />}
        {activeSection === 'social' && <SocialLinksAdmin />}
        {activeSection === 'seo' && <SeoMetaAdmin />}
        {/* Future: Add other sections here */}
      </main>
    </div>
  );
};

export default Admin; 