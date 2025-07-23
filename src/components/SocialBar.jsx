import { useEffect, useState } from 'react';
import { fetchAllSocialLinks } from '../utils/contentful';

export default function SocialBar() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      const links = await fetchAllSocialLinks();
      setSocialLinks(links);
    }
    loadLinks();
  }, []);

  return (
    <div className="fixed top-1/3 left-0 z-50 flex flex-col gap-4 p-2">
      {socialLinks.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition w-12 h-12"
        >
          {link.iconImage ? (
            <img src={link.iconImage} alt={link.name} className="w-6 h-6" />
          ) : (
            <span className="text-xs">{link.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
