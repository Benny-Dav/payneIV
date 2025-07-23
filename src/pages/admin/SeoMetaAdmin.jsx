import React, { useState, useEffect } from 'react';
import { fetchSeoMeta } from '../../utils/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const initialData = {
  pageTitle: 'Payne Photography | Professional Photography in Accra',
  metaDescription: 'Payne Photography - Capturing timeless moments in Accra, Ghana. Specializing in weddings, portraits, and events photography. Available worldwide.',
  ogImage: 'https://images.pexels.com/photos/9956819/pexels-photo-9956819.jpeg?auto=compress&w=1200&q=80',
};

function richTextToPlainText(richText) {
  if (!richText || typeof richText === 'string') return richText || '';
  // Recursively extract text from rich text nodes
  if (Array.isArray(richText.content)) {
    return richText.content.map(richTextToPlainText).join(' ');
  }
  if (richText.nodeType === 'text') {
    return richText.value;
  }
  if (richText.content) {
    return richTextToPlainText(richText.content);
  }
  return '';
}

const SeoMetaAdmin = () => {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    async function loadSeo() {
      const data = await fetchSeoMeta();
      if (data) {
        setForm({
          ...data,
          metaDescription: richTextToPlainText(data.metaDescription),
        });
      }
    }
    loadSeo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('SEO/Meta info saved (local only for now).');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-playfair mb-6">Edit SEO / Meta Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow mb-8">
        <div>
          <label className="block font-semibold mb-1">Page Title</label>
          <input
            type="text"
            name="pageTitle"
            value={form.pageTitle || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Meta Description</label>
          <textarea
            name="metaDescription"
            value={typeof form.metaDescription === 'string' ? form.metaDescription : ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Open Graph Image URL</label>
          <input
            type="text"
            name="ogImage"
            value={form.ogImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">Save Changes</button>
      </form>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Meta Preview</h3>
        <div className="mb-2">
          <span className="font-bold">Title:</span> {form.pageTitle}
        </div>
        <div className="mb-2">
          <span className="font-bold">Description:</span>
          {typeof form.metaDescription === 'string'
            ? form.metaDescription
            : documentToReactComponents(form.metaDescription)}
        </div>
        <div>
          <span className="font-bold">OG Image:</span><br />
          <img src={form.ogImage} alt="Open Graph Preview" className="w-full max-w-xs mt-2 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SeoMetaAdmin; 