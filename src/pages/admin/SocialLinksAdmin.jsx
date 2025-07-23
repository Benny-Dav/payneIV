import { useEffect, useState } from 'react';
import { fetchAllSocialLinks, updateSocialLink } from '../../utils/contentful';

const SocialLinksAdmin = () => {
  const [links, setLinks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    async function loadLinks() {
      const data = await fetchAllSocialLinks();
      setLinks(data);
    }
    loadLinks();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-playfair mb-6">Edit Social Links</h2>
      <div className="bg-gray-100 p-4 rounded shadow">
        <ul className="space-y-4">
          {links.map(link => (
            <li key={link.id} className="flex items-center gap-4">
              {link.iconImage && (
                <img src={link.iconImage} alt={link.name} className="w-8 h-8" />
              )}
              <span className="font-bold w-32">{link.name}</span>
              {editId === link.id ? (
                <>
                  <input
                    type="text"
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    className="border px-2 py-1 rounded flex-1"
                  />
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={async () => {
                      await updateSocialLink(link.id, { ...link, url: editUrl });
                      setLinks(links =>
                        links.map(l =>
                          l.id === link.id ? { ...l, url: editUrl } : l
                        )
                      );
                      setEditId(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <a href={link.url} className="text-blue-600 underline flex-1" target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                  <button
                    className="bg-black text-white px-3 py-1 rounded"
                    onClick={() => {
                      setEditId(link.id);
                      setEditUrl(link.url);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialLinksAdmin; 