import React, { useEffect, useState } from 'react';
import {
  fetchAllPortfolioPhotos,
  updatePortfolioPhoto,
  createPortfolioPhoto,
  deletePortfolioPhoto,
  fetchPortfolioContent,
  updatePortfolioContent,
  fetchAllCategories,
} from '../../utils/contentful';


const defaultPortfolioSection = {
  title: "Portfolio",
  description: "Explore our diverse photography portfolio featuring weddings, portraits, and events. Professional photography services in Accra and worldwide.",
  heroImage: "https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg",
};

const PortfolioAdmin = () => {
  const [photos, setPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addForm, setAddForm] = useState({ imageTitle: '', imageURL: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Banner/section state
  const [section, setSection] = useState(defaultPortfolioSection);
  const [sectionId, setSectionId] = useState(null);
  const [sectionEdit, setSectionEdit] = useState(defaultPortfolioSection);
  const [sectionEditing, setSectionEditing] = useState(false);
  const [sectionSaving, setSectionSaving] = useState(false);

  // Load section (banner/title/desc)
  useEffect(() => {
    async function loadSection() {
      const contentfulSection = await fetchPortfolioContent();
      if (contentfulSection) {
        setSection({ ...defaultPortfolioSection, ...contentfulSection });
        setSectionEdit({ ...defaultPortfolioSection, ...contentfulSection });
        setSectionId(contentfulSection.id);
      } else {
        setSection(defaultPortfolioSection);
        setSectionEdit(defaultPortfolioSection);
        setSectionId(null);
      }
    }
    loadSection();
  }, []);

  // Load photos (with fallback to default data)
  const loadPhotos = async () => {
    setLoading(true);
    const data = await fetchAllPortfolioPhotos();
    let mapped = data.map(photo => ({
      id: photo.photoId || photo.id || photo.sys?.id,
      imageTitle: photo.imageTitle,
      imageURL: photo.imageURL,
      category: photo.category,
    }));
 
    
    setPhotos(mapped);
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const cats = await fetchAllCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // Handle edit field changes
  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [id]: { ...prev[id], [name]: value } }));
  };

  // Handle add field changes
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  // Start editing a photo
  const handleEdit = (photo) => {
    setEditingId(photo.id);
    setEditForm((prev) => ({ ...prev, [photo.id]: {
      imageTitle: photo.imageTitle,
      imageURL: photo.imageURL,
      category: photo.category,
    }}));
  };

  // Cancel editing
  const handleCancel = (id) => {
    setEditingId(null);
    setEditForm((prev) => {
      const newForm = { ...prev };
      delete newForm[id];
      return newForm;
    });
  };

  // Save edited photo
  const handleSave = async (id) => {
    const form = editForm[id];
    await updatePortfolioPhoto(id, form);
    setPhotos((prev) => prev.map((photo) => photo.id === id ? { ...photo, ...form } : photo));
    setEditingId(null);
    setEditForm((prev) => {
      const newForm = { ...prev };
      delete newForm[id];
      return newForm;
    });
  };

  // Delete photo
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this photo? This action cannot be undone.");
    if (!confirmed) return;
    await deletePortfolioPhoto(id);
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditForm((prev) => {
        const newForm = { ...prev };
        delete newForm[id];
        return newForm;
      });
    }
  };

  // Add new photo
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (!addForm.imageURL || !addForm.category) {
        alert("Please select a category and provide an image URL.");
        return;
      }
      console.log('Add form:', addForm); // Debug log
      const entry = await createPortfolioPhoto(addForm);
      setPhotos((prev) => [
        ...prev,
        {
          id: entry.sys.id,
          ...addForm,
        },
      ]);
      setAddForm({ imageTitle: '', imageURL: '', category: '' });
    } catch (err) {
      console.error('Error adding photo:', err);
      alert('Failed to add photo. See console for details.');
    }
  };

  // Section (banner/title/desc) editing handlers
  const handleSectionEditChange = (e) => {
    const { name, value } = e.target;
    setSectionEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionEdit = () => {
    setSectionEditing(true);
  };

  const handleSectionCancel = () => {
    setSectionEdit(section);
    setSectionEditing(false);
  };

  const handleSectionSave = async () => {
    setSectionSaving(true);
    try {
      let updated;
      if (sectionId) {
        updated = await updatePortfolioContent(sectionId, sectionEdit);
      } else {
        // If no section exists, create one (not implemented here, but you can add createPortfolioContent)
        // For now, just update local state
        updated = { fields: sectionEdit, sys: { id: 'local' } };
      }
      setSection({ ...defaultPortfolioSection, ...sectionEdit });
      setSectionEditing(false);
      setSectionId(updated.sys.id);
    } finally {
      setSectionSaving(false);
    }
  };

  const uniqueCategories = categories.filter(
    (cat, idx, arr) =>
      arr.findIndex(c => c.fields.categoryName === cat.fields.categoryName) === idx
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
       <h2 className="text-2xl font-playfair mb-6">Edit Portfolio Content</h2>
      {/* Banner/Title/Description Editor */}
      {/* <div className="mb-10">
        <div className="relative h-[30vh] lg:h-[50vh] w-full rounded-lg overflow-hidden mb-4">
          <div
            className={`absolute inset-0 bg-[url('${sectionEdit.heroImage}')] bg-cover bg-center bg-no-repeat`}
            role="img"
            aria-label="Portfolio hero image for admin preview"
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white pt-8">
            {sectionEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={sectionEdit.title}
                  onChange={handleSectionEditChange}
                  className="text-5xl md:text-7xl font-playfair mb-4 bg-black/40 px-4 py-2 rounded w-full text-center"
                  placeholder="Portfolio Title"
                />
                <textarea
                  name="description"
                  value={sectionEdit.description}
                  onChange={handleSectionEditChange}
                  className="text-lg md:text-xl opacity-80 bg-black/40 px-4 py-2 rounded w-full text-center"
                  placeholder="Portfolio Description"
                  rows={2}
                />
                <input
                  type="text"
                  name="heroImage"
                  value={sectionEdit.heroImage}
                  onChange={handleSectionEditChange}
                  className="mt-2 bg-black/40 px-4 py-2 rounded w-full text-center"
                  placeholder="Banner Image URL"
                />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-playfair mb-4">{section.title}</h1>
                <p className="text-lg md:text-xl opacity-80">{section.description}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          {sectionEditing ? (
            <>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800 transition"
                onClick={handleSectionSave}
                disabled={sectionSaving}
              >
                {sectionSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                onClick={handleSectionCancel}
                disabled={sectionSaving}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              onClick={handleSectionEdit}
            >
              Edit Banner/Title/Description
            </button>
          )}
        </div>
      </div> */}

      {/* Photo grid (as before) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Existing photos */}
        {photos.map((photo) => {
          const isEditing = editingId === photo.id;
          const form = isEditing ? editForm[photo.id] : photo;
          return (
            <article key={photo.id} className="relative overflow-hidden rounded-lg bg-white shadow p-4 flex flex-col">
              <figure>
                <img
                  src={form.imageURL}
                  alt={form.imageTitle}
                  className="w-full aspect-[4/5] object-cover rounded mb-3"
                />
              </figure>
              <div className="space-y-2">
                <input
                  type="text"
                  name="imageTitle"
                  value={form.imageTitle}
                  onChange={e => handleEditChange(e, photo.id)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Image Title"
                  readOnly={!isEditing}
                />
                <input
                  type="text"
                  name="imageURL"
                  value={form.imageURL}
                  onChange={e => handleEditChange(e, photo.id)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Image URL"
                  readOnly={!isEditing}
                />
                {isEditing ? (
                  <select
                    name="category"
                    value={form.category?.sys?.id || ''}
                    onChange={e => {
                      const selected = categories.find(cat => cat.sys.id === e.target.value);
                      handleEditChange(
                        { target: { name: 'category', value: selected } },
                        photo.id
                      );
                    }}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Category</option>
                    {uniqueCategories.map(cat => (
                      <option key={cat.sys.id} value={cat.sys.id}>
                        {cat.fields.categoryName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="category"
                    value={form.category?.fields?.categoryName || ''}
                    readOnly
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Category"
                  />
                )}
              </div>
              <div className="flex gap-2 mt-3">
                {!isEditing ? (
                  <>
                    <button
                      className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
                      onClick={() => handleEdit(photo)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => handleDelete(photo.id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-800 transition"
                      onClick={() => handleSave(photo.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-600 transition"
                      onClick={() => handleCancel(photo.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}
        {/* Add new photo card */}
        <form onSubmit={handleAdd} className="relative overflow-hidden rounded-lg bg-white shadow p-4 flex flex-col border-2 border-dashed border-gray-300 justify-center items-center">
          <figure className="w-full mb-3 flex justify-center items-center aspect-[4/5] bg-gray-100 rounded">
            {addForm.imageURL ? (
              <img
                src={addForm.imageURL}
                alt={addForm.imageTitle}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">Image Preview</span>
            )}
          </figure>
          <div className="space-y-2 w-full">
            <input
              type="text"
              name="imageTitle"
              value={addForm.imageTitle}
              onChange={handleAddChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Image Title (optional)"
            />
            <input
              type="text"
              name="imageURL"
              value={addForm.imageURL}
              onChange={handleAddChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Image URL"
              required
            />
            <select
              name="category"
              value={addForm.category?.sys?.id || ''}
              onChange={e => {
                const selected = categories.find(cat => cat.sys.id === e.target.value);
                setAddForm(prev => ({ ...prev, category: selected }));
              }}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {uniqueCategories.map(cat => (
                <option key={cat.sys.id} value={cat.sys.id}>
                  {cat.fields.categoryName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mt-3">
            Add Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioAdmin; 