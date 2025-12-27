// C:\Users\jafar\Desktop\ta3awon\components\Footer.jsx
'use client';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHeart,
  FaCheckCircle,
  FaShieldAlt,
  FaHandHoldingHeart
} from 'react-icons/fa';
import { MdEmail, MdArrowForward } from "react-icons/md";

const Footer = () => {
  const { language, translations } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const quickLinks = [
    { label: translations[language].home, href: "/" },
    { label: translations[language].about, href: "#about" },
    { label: translations[language].campaigns, href: "#campaigns" },
    { label: translations[language].contact, href: "#contact" },
    { label: translations[language].ourProjects, href: "/projects" },
    { label: translations[language].getInvolved, href: "/get-involved" },
  ];

  const legalLinks = [
    { label: translations[language].privacyPolicy, href: "/privacy" },
    { label: translations[language].termsConditions, href: "/terms" },
    { label: translations[language].cookiesPolicy, href: "/cookies" },
    { label: translations[language].disclaimer, href: "/disclaimer" },
    { label: translations[language].sitemap, href: "/sitemap" },
    { label: translations[language].accessibility, href: "/accessibility" },
  ];

  const socialMedia = [
    { icon: <FaFacebookF />, name: "Facebook", color: "hover:bg-blue-600", href: "#" },
    { icon: <FaTwitter />, name: "Twitter", color: "hover:bg-cyan-500", href: "#" },
    { icon: <FaInstagram />, name: "Instagram", color: "hover:bg-pink-600", href: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", color: "hover:bg-blue-700", href: "#" },
    { icon: <FaYoutube />, name: "YouTube", color: "hover:bg-red-600", href: "#" },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      text: translations[language].address
    },
    {
      icon: <FaPhoneAlt className="text-lg" />,
      text: translations[language].phone,
      subtext: translations[language].emergency
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      text: translations[language].email
    },
    {
      icon: <FaClock className="text-lg" />,
      text: translations[language].workingHours
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-green-900 to-green-950 text-white overflow-hidden">
      {/* Top Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12">
            
            {/* Column 1: Logo & About */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="relative w-16 h-16">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{translations[language].platformName}</h3>
                  <p className="text-green-200 text-sm mt-1">{translations[language].certified}</p>
                </div>
              </div>
              
              <p className="text-green-100 leading-relaxed">
                {translations[language].footerAbout}
              </p>
              
              {/* Trust Badges */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaCheckCircle className="text-green-400" />
                  <span className="text-sm">{translations[language].registration}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaShieldAlt className="text-green-400" />
                  <span className="text-sm">{translations[language].trusted}</span>
                </div>
              </div>
              
              {/* Donate Button */}
              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mt-4">
                <FaHandHoldingHeart />
                {translations[language].donateNow}
              </button>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-green-700 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-3">
                  <MdArrowForward className="rotate-90 lg:rotate-0" />
                </span>
                {translations[language].quickLinks}
              </h3>
              
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-3 group-hover:w-4 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Legal Links */}
              <h4 className="text-lg font-semibold mt-8 mb-4 text-green-300">
                {language === 'ar' ? 'معلومات قانونية' : 'Legal'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {legalLinks.slice(0, 4).map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="text-green-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-green-700 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-3">
                  <FaPhoneAlt />
                </span>
                {translations[language].contactUs}
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-300">{info.icon}</span>
                    </div>
                    <div>
                      <p className="text-green-100">{info.text}</p>
                      {info.subtext && (
                        <p className="text-green-300 text-sm mt-1 font-medium">{info.subtext}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-green-300">
                  {translations[language].followUs}
                </h4>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-green-200 hover:text-white transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-green-700 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-3">
                  <MdEmail />
                </span>
                {translations[language].newsletterTitle}
              </h3>
              
              <p className="text-green-100 mb-6">
                {translations[language].newsletterDesc}
              </p>
              
              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={translations[language].emailPlaceholder}
                    className="w-full px-4 py-3 bg-green-800 border border-green-700 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-3 text-green-300">
                    <FaPaperPlane />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {translations[language].subscribe}
                  <MdArrowForward className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
                
                {isSubscribed && (
                  <div className="p-3 bg-green-800/50 border border-green-600 rounded-lg">
                    <p className="text-green-300 text-center">
                      {translations[language].subscribed}
                    </p>
                  </div>
                )}
              </form>
              
              {/* Payment Methods */}
              <div className="mt-8 pt-8 border-t border-green-800">
                <h4 className="text-lg font-semibold mb-4 text-green-300">
                  {language === 'ar' ? 'طرق الدفع الآمنة' : 'Secure Payment Methods'}
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {['Visa', 'MasterCard', 'PayPal', 'Bank'].map((method, index) => (
                    <div 
                      key={index}
                      className="h-10 bg-green-800 rounded flex items-center justify-center text-sm text-green-200"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-800"></div>

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-green-300">
                {translations[language].copyright}
              </p>
              <p className="text-green-400 text-sm mt-2">
                {translations[language].madeWith}
              </p>
            </div>
            
            {/* Language Selector in Footer */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {/* Partner Logos */}
              <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-xs"
                  >
                    P{i}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link 
                  href="/ar" 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${language === 'ar' ? 'bg-green-700 text-white' : 'bg-green-800 text-green-200 hover:bg-green-700'}`}
                >
                  العربية
                </Link>
                <Link 
                  href="/en" 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${language === 'en' ? 'bg-green-700 text-white' : 'bg-green-800 text-green-200 hover:bg-green-700'}`}
                >
                  English
                </Link>
              </div>
            </div>
          </div>
          
          {/* Trust Seals */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-8 border-t border-green-800">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FaShieldAlt className="text-green-400" />
              <span className="text-green-300 text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FaCheckCircle className="text-green-400" />
              <span className="text-green-300 text-sm">Verified Charity</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FaHeart className="text-green-400" />
              <span className="text-green-300 text-sm">Tax Deductible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-110 z-40"
        aria-label={language === 'ar' ? 'العودة للأعلى' : 'Back to top'}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;