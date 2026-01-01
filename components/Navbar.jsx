// C:\Users\jafar\Desktop\ta3awon\components\Navbar.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { MdLanguage } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, translations, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const getNavbarBackground = () => {
    if (isMenuOpen) {
      return 'bg-gradient-to-r from-green-900 to-green-800';
    }
    if (isHomePage && !isScrolled && !isMenuOpen) {
      return 'bg-transparent backdrop-blur-sm';
    }
    return 'bg-gradient-to-r from-green-900 to-green-800';
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavbarBackground()}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 40px, 48px"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-green-300 transition-colors text-lg font-medium"
              >
                {translations[language].home}
              </Link>
              <Link 
                href="#about" 
                className="text-white hover:text-green-300 transition-colors text-lg font-medium"
              >
                {translations[language].about}
              </Link>
              <Link 
                href="#campaigns" 
                className="text-white hover:text-green-300 transition-colors text-lg font-medium"
              >
                {translations[language].campaigns}
              </Link>
              <Link 
                href="#contact" 
                className="text-white hover:text-green-300 transition-colors text-lg font-medium"
              >
                {translations[language].contact}
              </Link>
            </div>

            {/* Right side - Language, Login & Mobile Menu Button */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Language Toggle Button */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-white hover:text-green-300 transition-colors"
                aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <MdLanguage className="text-xl sm:text-2xl" />
                <span className="font-medium text-sm sm:text-base">
                  {language === 'ar' ? 'EN' : 'AR'}
                </span>
              </button>

              {/* Desktop Login Button */}
              <Link 
                href="/auth/signin" // CHANGED FROM /login TO /auth/signin
                className="hidden sm:block bg-white text-green-900 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition-colors text-sm sm:text-base"
              >
                {translations[language].login}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden menu-button text-white text-2xl p-2 hover:text-green-300 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <IoClose /> : <IoMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden mobile-menu fixed inset-0 top-0 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-full'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-green-900 to-green-800 shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="container mx-auto px-4 pt-20 pb-8">
              {/* Logo and Close Button in Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center">
                  <div className="relative w-12 h-12">
                    <Image 
                      src="/logo.png" 
                      alt="Logo" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="ml-3 text-white text-xl font-bold">
                    {translations[language].platformName}
                  </span>
                </Link>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-6 mb-8">
                <Link 
                  href="/" 
                  className="text-white text-2xl font-medium py-3 px-4 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="ml-3">🏠</span>
                  <span className="mr-3">{translations[language].home}</span>
                </Link>
                <Link 
                  href="#about" 
                  className="text-white text-2xl font-medium py-3 px-4 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="ml-3">ℹ️</span>
                  <span className="mr-3">{translations[language].about}</span>
                </Link>
                <Link 
                  href="#campaigns" 
                  className="text-white text-2xl font-medium py-3 px-4 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="ml-3">🎯</span>
                  <span className="mr-3">{translations[language].campaigns}</span>
                </Link>
                <Link 
                  href="#contact" 
                  className="text-white text-2xl font-medium py-3 px-4 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="ml-3">📞</span>
                  <span className="mr-3">{translations[language].contact}</span>
                </Link>
              </div>

              {/* Mobile Login Button */}
              <Link 
                href="/auth/signin" // CHANGED FROM /login TO /auth/signin
                className="block w-full bg-white text-green-900 py-4 rounded-full font-semibold hover:bg-green-100 transition-colors text-center text-lg mb-6"
                onClick={() => setIsMenuOpen(false)}
              >
                {translations[language].login}
              </Link>

              {/* Mobile Language Toggle - Large Button */}
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-3 bg-white/10 text-white py-4 rounded-full font-semibold hover:bg-white/20 transition-colors text-lg"
              >
                <MdLanguage className="text-2xl" />
                <span>
                  {language === 'ar' 
                    ? 'Switch to English' 
                    : 'التبديل إلى العربية'
                  }
                </span>
              </button>

              {/* Contact Info in Mobile Menu */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="text-white/80 text-center">
                  <p className="mb-2">{language === 'ar' ? 'منصة تعاون السورية' : 'Syrian Cooperation Platform'}</p>
                  <p className="text-sm">info@ta3awon.org</p>
                  <p className="text-sm">+963 XXX XXX XXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;