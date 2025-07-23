import React, { useState, useEffect } from 'react';
import { fetchHomepageContent, updateHomepageContent } from '../../utils/contentful';

const initialData = {
  welcomeText: 'WELCOME TO MY WORLD',
  heroHeadline: 'Capturing Timeless Moments in Time',
  heroSubheadline: 'Payne Photography by Ebenezer Addison',
  heroImageUrl: 'https://images.pexels.com/photos/9956819/pexels-photo-9956819.jpeg?auto=compress&w=1920&q=80',
  locationInfo: 'Based in Accra, Available Worldwide',
};

const HomepageAdmin = () => {
  const [form, setForm] = useState(initialData);
  const [entryId, setEntryId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch homepage content on mount
  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      const entry = await fetchHomepageContent();
      if (entry) {
        setEntryId(entry.id);
        setForm({
          welcomeText: entry.welcomeText ?? initialData.welcomeText,
          heroHeadline: entry.heroHeadline ?? initialData.heroHeadline,
          heroSubheadline: entry.heroSubheadline ?? initialData.heroSubheadline,
          heroImageUrl: entry.heroImageUrl ?? initialData.heroImageUrl,
          locationInfo: entry.locationInfo ?? initialData.locationInfo,
        });
        console.log('Fetched entry:', entry);
        console.log('Entry fields:', entry?.fields);
      }
      setLoading(false);
    }
    loadContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entryId) return;
    await updateHomepageContent(entryId, form);
    alert('Homepage content updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-playfair mb-6">Edit Homepage Content</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold mb-1">Welcome Text</label>
          <input
            type="text"
            name="welcomeText"
            value={form.welcomeText}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hero Headline</label>
          <input
            type="text"
            name="heroHeadline"
            value={form.heroHeadline}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hero Subheadline</label>
          <input
            type="text"
            name="heroSubheadline"
            value={form.heroSubheadline}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hero Background Image URL</label>
          <input
            type="text"
            name="heroImageUrl"
            value={form.heroImageUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Location Info</label>
          <input
            type="text"
            name="locationInfo"
            value={form.locationInfo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">Save Changes</button>
      </form>

      {/* Live Preview */}
      <div className="mt-12">
        <h3 className="text-xl font-playfair mb-4">Live Preview</h3>
        <div className="relative h-[60vh] rounded overflow-hidden text-white shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${form.heroImageUrl}')` }}
            aria-label="Hero background preview"
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
            <header className="text-center max-w-2xl">
              <p className="text-sm tracking-[0.3em] mb-4 font-light">{form.welcomeText}</p>
              <h1 className="text-3xl md:text-5xl font-playfair mb-6 leading-tight">{form.heroHeadline}</h1>
              <p className="text-lg text-white/80 mb-8 font-light tracking-wide">{form.heroSubheadline}</p>
            </header>
            <footer className="absolute bottom-6 left-0 right-0 flex justify-center">
              <p className="text-sm tracking-wider font-light bg-black/60 px-4 py-2 rounded">{form.locationInfo}</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageAdmin; 