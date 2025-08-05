import React, { useEffect, useState } from 'react'
import { fetchHomepageContent } from '../utils/contentful'
import SocialIcons from '../components/SocialIcons'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { fetchAllSocialLinks } from '../utils/contentful';

const initialData = {
  welcomeText: 'WELCOME TO MY WORLD',
  heroHeadline: 'Capturing Timeless Moments in Time',
  heroSubheadline: 'Payne Photography by Ebenezer Addison',
  heroImageUrl: 'https://images.pexels.com/photos/9956819/pexels-photo-9956819.jpeg?auto=compress&w=1920&q=80',
  locationInfo: 'Based in Accra, Available Worldwide',
}

const Home = () => {
  const [content, setContent] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    async function loadContent() {
      const data = await fetchHomepageContent()
      if (data) setContent(data)
      setLoading(false)
    }
    loadContent()
  }, [])

  useEffect(() => {
    async function loadLinks() {
      const links = await fetchAllSocialLinks();
      setSocialLinks(links);
    }
    loadLinks();
  }, []);

  if (loading) return <div>Loading...</div>

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <SEO 
        title="Professional Photography in Accra"
        description="Payne Photography - Capturing timeless moments in Accra, Ghana. Specializing in weddings, portraits, and events photography. Available worldwide."
        image={content.heroImageUrl}
      />
      <article className="h-[100vh] relative overflow-hidden text-white">
        {/* Hero Section */}
        <section className="relative h-full">
          {/* Background Image */}
          <div 
            role="img"
            aria-label="Hero background showing a professional photography setup"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${content.heroImageUrl}')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Main Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <motion.header 
              className="text-center max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="text-sm md:text-base tracking-[0.3em] mb-6 font-light"
                variants={itemVariants}
              >
                {content.welcomeText}
              </motion.p>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-8 leading-tight"
                variants={itemVariants}
              >
                {content.heroHeadline}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light tracking-wide"
                variants={itemVariants}
              >
                {content.heroSubheadline}
              </motion.p>
            </motion.header>
          </div>

          {/* Bottom Bar */}
          <footer className="absolute bottom-0 left-0 right-0 p-8 px-16">
            <div className="container mx-auto flex justify-between items-center">
              {/* Location Info */}
              <motion.div 
                className="hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <p className="text-sm tracking-wider font-light">
                  <span className="sr-only">Location:</span>
                  {content.locationInfo}
                </p>
              </motion.div>
            </div>
          </footer>

          {/* Social Icons with fade-in animation */}
          <motion.aside
            className="fixed top-3/4 lg:top-[44%] left-10 lg:left-20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex flex-col gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {link.iconImage && (
                    <img
                      src={link.iconImage}
                      alt={link.name}
                      className="w-8 h-8"
                    />
                  )}
                  {/* <span>{link.name}</span> */}
                </a>
              ))}
            </div>
          </motion.aside>
        </section>
      </article>
    </>
  )
}

export default Home
 