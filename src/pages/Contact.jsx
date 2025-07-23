import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { fetchContactInfo } from '../utils/contentful';

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function loadContact() {
      const data = await fetchContactInfo();
      setContact(data);
    }
    loadContact();
  }, []);

  if (!contact) return <div>Loading...</div>;

  const contactInfo = {
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    availability: contact.availability
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://instagram.com/paynephotography"
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0011.14-4.02v-7a8.16 8.16 0 004.65 1.49v-3.88a4.85 4.85 0 01-1.2 0z"/>
        </svg>
      ),
      url: "https://tiktok.com/@paynephotography"
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: "https://wa.me/233207982088"
    }
  ];

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Payne Photography in Accra. Book a session, inquire about our services, or discuss your photography needs."
        image="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&w=1200&q=80"
      />
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[30vh] lg:h-[40vh] w-full">
        <div 
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&w=1920&q=80')] 
          bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white pt-8">
            <motion.h1 
              className="text-5xl md:text-7xl font-playfair mb-4"
              {...fadeIn}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-80"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Let's discuss your photography needs
            </motion.p>
          </div>
      </div>

        {/* Contact Information */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <motion.div 
            className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
              <div>
                <h2 className="text-3xl font-playfair mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 text-black">📧</span>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-600 transition-colors">
                      {contactInfo.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 text-black">📱</span>
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-gray-600 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 text-black">📍</span>
                    {contactInfo.address}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 text-black">🌍</span>
                    {contactInfo.availability}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-playfair mb-4">Follow Us</h3>
                <div className="flex gap-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-600 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - CTA */}
            <motion.div 
              className="bg-black text-white p-8 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-playfair mb-6">Ready to Book?</h2>
              <p className="mb-8 text-gray-300">
                Whether it's a wedding, portrait session, or special event, we're here to capture your precious moments.
              </p>
              <Link 
                to="/book"
                className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Book a Session
              </Link>
              </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 