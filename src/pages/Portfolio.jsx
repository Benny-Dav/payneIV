import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from '../components/SEO';
import { fetchAllPortfolioPhotos, fetchPortfolioContent } from '../utils/contentful';
import LoadingSpinner from '../components/LoadingSpinner';


const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [section, setSection] = useState(null);
  const [portfolioPhotos, setPortfolioPhotos]=useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch Contentful section data, fallback to defaults
 // In your Portfolio component's useEffect:
useEffect(() => {
  async function loadSection() {
    setLoading(true);
    try {
      const [contentfulSection, contentfulPhotos] = await Promise.all([
        fetchPortfolioContent(),
        fetchAllPortfolioPhotos()
      ]);
      console.log('contentfulSection:', contentfulSection);
      console.log('contentfulPhotos:', contentfulPhotos);
      
      setSection({
        ...contentfulSection,
        images: [
          ...(contentfulSection?.images || []),
          ...(contentfulPhotos || [])
        ]
      });
      
      setPortfolioPhotos(contentfulPhotos || []);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  }
  loadSection();
}, []);

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'All'
    ? portfolioPhotos
    : portfolioPhotos.filter(item =>
      item.category &&
      item.category.fields?.categoryName === selectedCategory
    );

  // Get unique categories
  const categories = ['All', ...new Set(
    portfolioPhotos
      .map(item => item.category)
      .filter(Boolean) // removes undefined/null/empty
  )];
  

  // Handle image selection
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  // Navigation functions
  const goToNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedImage(filteredImages[currentImageIndex + 1]);
    }
  };

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedImage(filteredImages[currentImageIndex - 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);
  console.log('section.categories:', section?.categories);
  if (loading) return <LoadingSpinner />;
  if (!section || !portfolioPhotos.length) return <LoadingSpinner />;
  return (
    <>
      <SEO 
        title={section.title}
        description={section.description}
        image={section.heroImage}
      />
      <article className="min-h-screen bg-white">
        {/* Hero Banner */}
        <header className="relative h-[30vh] lg:h-[50vh] w-full">
          <div 
            role="img"
            aria-label="Portfolio hero image showcasing professional photography"
            className="absolute inset-0 bg-[url('https://res.cloudinary.com/dotefyezt/image/upload/v1752964087/486A9454_jtcksv.jpg')] bg-cover bg-center bg-no-repeat"
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white pt-8">
            <h1 className="text-5xl md:text-7xl font-playfair mb-4 ">{section.title}</h1>
            <p className="text-lg md:text-xl opacity-80">Some of my best works</p>
          </div>
        </header>

        {/* Category Filter */}
        <nav className="sticky top-0 z-20 bg-white">
          <div className="container mx-auto py-6">
            <div className="flex flex-wrap justify-center gap-2 px-4 mb-4" role="tablist">
              <button
                key="All"
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-1 rounded-full transition-all duration-300 ${
                  selectedCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } text-sm font-medium`}
              >
                All
              </button>
              {section.categories && section.categories.length > 0 && section.categories.map((cat, idx) => (
                <button
                  key={cat.sys?.id || idx}
                  onClick={() => setSelectedCategory(cat.fields.categoryName)}
                  className={`px-4 py-1 rounded-full transition-all duration-300 ${
                    selectedCategory === cat.fields.categoryName
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } text-sm font-medium`}
                >
                  {cat.fields?.categoryName || 'Untitled'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Image Grid */}
        <section 
          className="container mx-auto px-4 py-12"
          role="tabpanel"
          aria-label="Portfolio gallery"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredImages.map((image, index) => (
              <article 
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <figure>
                  <img
                    src={image.imageURL}
                    
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <figcaption className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-2 md:p-4">
                      {/* <h2 className="text-base md:text-xl font-playfair mb-1 md:mb-2">{image.title}</h2> */}
                      
                    </div>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 w-full h-full"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center relative"
              >
                {/* Navigation Buttons */}
                <button
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[60] p-3 text-white rounded-full bg-black/50 hover:bg-black/70 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  disabled={currentImageIndex === 0}
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[60] p-3 text-white rounded-full bg-black/50 hover:bg-black/70 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  disabled={currentImageIndex === filteredImages.length - 1}
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Container */}
                <div 
                  className="relative max-w-7xl w-full mx-4"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 z-[60] text-white text-2xl p-3 hover:opacity-80 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close lightbox"
                  >
                    ×
                  </button>
                  
                  <figure className="relative">
                    <img
                      src={selectedImage.imageURL}
                      // alt={selectedImage.title}
                      className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                    />
                    <figcaption className="text-white p-4 text-center">
                      {/* <h3 className="text-xl md:text-2xl font-semibold">{selectedImage.title}</h3> */}
                      <p className="text-gray-300 mt-2">{selectedImage.description}</p>
                    </figcaption>
                  </figure>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </article>
    </>
  );
};

export default Portfolio; 