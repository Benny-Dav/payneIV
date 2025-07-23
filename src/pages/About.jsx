import React from 'react'
import SEO from '../components/SEO'

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <SEO 
        title="About Us"
        description="Learn more about Payne Photography in Accra. Professional photographer specializing in weddings, portraits, and events."
        image="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1200&q=80"
      />
      <div className="container mx-auto">
        <h1 className="text-4xl mb-10">About</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100">
            {/* Photographer image will go here */}
          </div>
          <div>
            {/* Bio content will go here */}
          </div>
        </div>
      </div>
      <div 
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1920&q=80')] 
        bg-cover bg-center bg-no-repeat"
      >
      </div>
    </div>
  )
}

export default About 