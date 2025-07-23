import React, { useState, useEffect } from 'react';
import { fetchContactInfo, updateContactInfo } from '../../utils/contentful';

const initialData = {
  email: 'info@paynephotography.com',
  phone: '+233 20 798 2088',
  address: 'Accra, Ghana',
  availability: 'Available Worldwide',
};

const ContactInfoAdmin = () => {
 
    const [form, setForm] = useState({ email: '', phone: '', address: '', availability: '' });
    const [entryId, setEntryId] = useState(null);
  
    useEffect(() => {
      async function loadContact() {
        const data = await fetchContactInfo();
        if (data) {
          setForm(data);
          setEntryId(data.id);
        }
      }
      loadContact();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!entryId) return;
      await updateContactInfo(entryId, form);
      alert('Contact info updated!');
    };
  
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-playfair mb-6">Edit Contact Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow mb-8">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Availability</label>
          <input
            type="text"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">Save Changes</button>
      </form>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Current Info</h3>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Email:</strong> {form.email}</li>
          <li><strong>Phone:</strong> {form.phone}</li>
          <li><strong>Address:</strong> {form.address}</li>
          <li><strong>Availability:</strong> {form.availability}</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfoAdmin; 