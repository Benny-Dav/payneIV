import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SchemaMarkup from './SchemaMarkup'
import { fetchContactInfo } from '../utils/contentful'

const Layout = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [contactInfo, setContactInfo] = useState(null)

  useEffect(() => {
    async function loadContactInfo() {
      const data = await fetchContactInfo()
      setContactInfo(data)
    }
    loadContactInfo()
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-inter text-primary bg-white">
      <SchemaMarkup />
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer - Only show on non-home pages */}
      {!isHomePage && (
        <footer className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-playfair text-xl mb-4">PAYNE PHOTOGRAPHY</h3>
                <p className="text-white/70">Capturing moments that last forever</p>
              </div>
              <div>
                <h4 className="font-playfair text-lg mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="/portfolio" className="block hover:text-accent transition-colors">Portfolio</a>
                  <a href="/about" className="block hover:text-accent transition-colors">About</a>
                  <a href="/services" className="block hover:text-accent transition-colors">Services</a>
                  <a href="/contact" className="block hover:text-accent transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h4 className="font-playfair text-lg mb-4">Contact</h4>
                <div className="space-y-2">
                  {contactInfo ? (
                    <>
                      <p>{contactInfo.email}</p>
                      <p>{contactInfo.phone}</p>
                    </>
                  ) : (
                    <>
                      <p>Loading...</p>
                      <p>Loading...</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-300 text-center">© Developed by Benedicta Davour</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Layout 