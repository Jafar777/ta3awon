// C:\Users\jafar\Desktop\ta3awon\components\Contact.jsx
'use client';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  const { language, translations } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = [
    { value: 'general', label: translations[language].subjectGeneral },
    { value: 'donation', label: translations[language].subjectDonation },
    { value: 'volunteer', label: translations[language].subjectVolunteer },
    { value: 'partnership', label: translations[language].subjectPartnership },
    { value: 'media', label: translations[language].subjectMedia },
    { value: 'other', label: translations[language].subjectOther }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = translations[language].formRequired;
    if (!formData.email.trim()) {
      newErrors.email = translations[language].formRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = translations[language].formEmailInvalid;
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = translations[language].formPhoneInvalid;
    }
    if (!formData.subject) newErrors.subject = translations[language].formRequired;
    if (!formData.message.trim()) newErrors.message = translations[language].formRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: translations[language].contactAddressTitle,
      content: translations[language].contactAddress,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      delay: "100"
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      title: translations[language].contactPhoneTitle,
      content: translations[language].contactPhone,
      color: "text-green-600",
      bgColor: "bg-green-50",
      delay: "200",
      emergency: translations[language].contactEmergency
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: translations[language].contactEmailTitle,
      content: translations[language].contactEmail,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      delay: "300"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: translations[language].contactHoursTitle,
      content: translations[language].contactHours,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      delay: "400"
    }
  ];

  const socialMedia = [
    { icon: <FaFacebookF />, name: "Facebook", color: "hover:bg-blue-600", href: "#" },
    { icon: <FaTwitter />, name: "Twitter", color: "hover:bg-cyan-500", href: "#" },
    { icon: <FaInstagram />, name: "Instagram", color: "hover:bg-pink-600", href: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", color: "hover:bg-blue-700", href: "#" },
    { icon: <FaYoutube />, name: "YouTube", color: "hover:bg-red-600", href: "#" }
  ];

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-green-100 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-green-200 opacity-20 blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-10 blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold mb-4">
            {language === 'ar' ? 'نحن هنا لمساعدتك' : 'We Are Here For You'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            {translations[language].contactTitle}
          </h2>
          <p className="text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
            {translations[language].contactSubtitle}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            {translations[language].contactDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          
          {/* Left Column - Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 md:p-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <MdOutlineSupportAgent className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {language === 'ar' ? 'أرسل رسالتك' : 'Send Your Message'}
                    </h3>
                    <p className="text-green-100">
                      {language === 'ar' 
                        ? 'سوف نرد عليك خلال 24 ساعة' 
                        : 'We will respond within 24 hours'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                  <FaCheck className="text-green-600 text-xl mr-3" />
                  <div>
                    <p className="font-semibold text-green-800">{translations[language].messageSent}</p>
                    <p className="text-green-700 text-sm">
                      {language === 'ar' 
                        ? 'شكراً لتواصلك معنا. سوف نرد عليك قريباً.' 
                        : 'Thank you for contacting us. We will respond to you shortly.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].formName} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <FaExclamationCircle />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations[language].formEmail} *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <FaExclamationCircle />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations[language].formPhone}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={language === 'ar' ? '+963 XXX XXX XXX' : '+1 (555) 123-4567'}
                        />
                        {errors.phone && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <FaExclamationCircle />
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].formSubject} *
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all duration-300 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{language === 'ar' ? 'اختر الموضوع' : 'Select a subject'}</option>
                        {subjects.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <FaExclamationCircle />
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].formMessage} *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={language === 'ar' 
                          ? 'اكتب رسالتك هنا...' 
                          : 'Type your message here...'}
                      />
                      {errors.message && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <FaExclamationCircle />
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting 
                          ? 'opacity-80 cursor-not-allowed' 
                          : 'hover:from-green-700 hover:to-green-600 hover:shadow-xl transform hover:-translate-y-1'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {translations[language].sending}
                        </>
                      ) : (
                        <>
                          {translations[language].sendMessage}
                          <IoIosSend className="text-xl" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact Information Cards */}
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                <FaPaperPlane className="mr-3 text-green-600" />
                {translations[language].contactInfoTitle}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="flex items-start">
                      <div className={`w-14 h-14 rounded-xl ${info.bgColor} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={info.color}>
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-gray-600">{info.content}</p>
                        {info.emergency && (
                          <p className="text-sm text-green-600 mt-2 font-medium">{info.emergency}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map/Office Location */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {language === 'ar' ? 'موقعنا' : 'Our Location'}
                    </h3>
                    <p className="text-green-100">
                      {language === 'ar' 
                        ? 'مقرنا الرئيسي في دمشق' 
                        : 'Our main headquarters in Damascus'}
                    </p>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-green-400 to-green-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <FaMapMarkerAlt className="text-white text-3xl" />
                      </div>
                      <h4 className="text-white text-xl font-bold mb-2">Damascus, Syria</h4>
                      <p className="text-green-100">
                        {language === 'ar' 
                          ? 'مركز إعادة الإعمار الاستراتيجي' 
                          : 'Strategic Reconstruction Center'}
                      </p>
                    </div>
                  </div>
                  {/* Decorative Map Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-4 border-white/30 rounded-full"></div>
                  <div className="absolute top-10 right-10 w-6 h-6 border-3 border-white/30 rounded-full"></div>
                  <div className="absolute bottom-10 left-10 w-4 h-4 border-2 border-white/30 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <FaPaperPlane className="mr-3 text-green-600" />
                {translations[language].followUs}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'تابع آخر أخبارنا وإنجازاتنا على وسائل التواصل الاجتماعي' 
                  : 'Follow our latest news and achievements on social media'}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <FaPhoneAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-red-900 mb-1">
                    {language === 'ar' ? 'اتصال طارئ' : 'Emergency Contact'}
                  </h4>
                  <p className="text-red-700 mb-2">+963 99 999 9999</p>
                  <p className="text-red-600 text-sm">
                    {language === 'ar' 
                      ? 'متاح 24/7 للحالات الطارئة والمعلومات العاجلة' 
                      : 'Available 24/7 for emergencies and urgent information'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Guarantee */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 px-8 py-4 rounded-full shadow-lg border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FaCheck className="text-green-700 text-xl" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-green-900">
                {language === 'ar' ? 'ضمان وقت الاستجابة' : 'Response Time Guarantee'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'ar' 
                  ? 'نضمن الرد على استفساراتك خلال 24 ساعة عمل' 
                  : 'We guarantee to respond to your inquiries within 24 business hours'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;