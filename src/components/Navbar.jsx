import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import menuIcon from '../assets/menu-black.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const location = useLocation()
    const menuRef = useRef(null)
    const isHomePage = location.pathname === '/'

    // Handle initial animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000) // 2 second delay
        return () => clearTimeout(timer)
    }, [])

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    const navbarClasses = `fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
    } ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' }
    ]

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Flash Effect */}
                        <motion.div
                            className="fixed inset-0 bg-white z-[60] pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 0] }}
                            transition={{ 
                                duration: 1.2,
                                times: [0, 0.3, 1],
                                ease: "easeInOut"
                            }}
                        />
                        
                        {/* Navbar */}
                        <motion.nav
                            className={navbarClasses}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ 
                                duration: 0.6,
                                delay: 0.8 
                            }}
                        >
                            <div className="container mx-auto px-8">
                                <div className={`rounded-full transition-all duration-300 ${
                                    isScrolled 
                                        ? 'bg-white/90 backdrop-blur-md shadow-lg'
                                        : 'bg-white'
                                }`}>
                                    <div className="px-8 py-4">
                                        {/* Desktop Navigation */}
                                        <div className="hidden md:flex justify-between items-center">
                                            {/* Logo */}
                                            <Link to="/" className="font-playfair font-bold text-2xl">
                                                PAYNE IV
                                            </Link>

                                            {/* Menu */}
                                            <div className="flex space-x-12 text-md font-semibold tracking-widest">
                                                {menuItems.map(item => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className="hover:text-accent transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>

                                            <div>
                                                <Link 
                                                    to="/book" 
                                                    className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
                                                        isScrolled
                                                            ? 'bg-black text-white hover:bg-accent'
                                                            : 'bg-black text-white'
                                                    }`}
                                                >
                                                    Book a Session
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Mobile Navigation */}
                                        <div className="md:hidden flex justify-between items-center">
                                            <Link to="/" className="text-2xl font-playfair">
                                                PAYNE IV
                                            </Link>
                                            <button
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                                className="z-50 w-8 h-8 flex items-center justify-center"
                                                aria-label="Toggle menu"
                                            >
                                                <img 
                                                    src={menuIcon} 
                                                    alt="Menu" 
                                                    className="w-6 h-6 transition-opacity duration-300"
                                                    style={{ opacity: isMenuOpen ? '0' : '1' }}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed top-0 right-0 w-[60%] h-full bg-white z-50 transition-transform duration-500 md:hidden shadow-[-10px_0_20px_rgba(0,0,0,0.1)] ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                ref={menuRef}
            >
                <div className="h-full flex flex-col px-8">
                    {/* Menu Header */}
                    <div className="py-8 flex justify-between items-center border-b border-black/10">
                        <Link to="/" className="text-2xl font-playfair" onClick={() => setIsMenuOpen(false)}>
                            PAYNE IV
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-8 h-8 flex items-center justify-center"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col space-y-8 mt-12">
                        {menuItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-lg tracking-widest text-black/70 hover:text-black transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link 
                            to="/book" 
                            className="mt-8 px-8 py-3 rounded-full bg-black text-white text-sm tracking-wider hover:bg-accent transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Book a Session
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlay for click outside */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Navbar 