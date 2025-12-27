// C:\Users\jafar\Desktop\ta3awon\components\About.jsx
'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaHandsHelping, FaEye, FaBullseye, FaUsers, FaCheckCircle, FaChartLine, FaLeaf, FaHeart } from 'react-icons/fa';

const About = () => {
  const { language, translations } = useLanguage();

  return (
    <section id="about" className="relative py-16 md:py-24 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-green-100 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            {language === 'ar' ? 'مبادرة إنسانية' : 'Humanitarian Initiative'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            {translations[language].aboutTitle}
          </h2>
          <p className="text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
            {translations[language].aboutSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
          
          {/* Left Column - Image/Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* You can replace this with an actual image if you have one */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaHandsHelping className="text-white text-6xl md:text-8xl mb-4 mx-auto" />
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {language === 'ar' ? 'يداً بيد' : 'Hand in Hand'}
                  </h3>
                  <p className="text-green-100">
                    {language === 'ar' ? 'نبني معاً مستقبلاً أفضل' : 'Building a Better Future Together'}
                  </p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-green-300 opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-green-400 opacity-20"></div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {translations[language].aboutDescription1}
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {translations[language].aboutDescription2}
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Mission Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FaBullseye className="text-green-700 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">
                    {translations[language].aboutMissionTitle}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {translations[language].aboutMissionText}
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FaEye className="text-green-700 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">
                    {translations[language].aboutVisionTitle}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {translations[language].aboutVisionText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-12">
            {language === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Value 1: Transparency */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-50">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <FaCheckCircle className="text-green-700 text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-center text-green-900 mb-3">
                {translations[language].value1Title}
              </h4>
              <p className="text-gray-600 text-center">
                {translations[language].value1Desc}
              </p>
            </div>

            {/* Value 2: Impact */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-50">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <FaChartLine className="text-green-700 text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-center text-green-900 mb-3">
                {translations[language].value2Title}
              </h4>
              <p className="text-gray-600 text-center">
                {translations[language].value2Desc}
              </p>
            </div>

            {/* Value 3: Sustainability */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-50">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <FaLeaf className="text-green-700 text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-center text-green-900 mb-3">
                {translations[language].value3Title}
              </h4>
              <p className="text-gray-600 text-center">
                {translations[language].value3Desc}
              </p>
            </div>

            {/* Value 4: Community */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-50">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-green-700 text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-center text-green-900 mb-3">
                {translations[language].value4Title}
              </h4>
              <p className="text-gray-600 text-center">
                {translations[language].value4Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-8 md:p-12 shadow-2xl mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
            {language === 'ar' ? 'أرقامنا تتحدث' : 'Our Impact in Numbers'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">80+</div>
              <div className="text-green-100 font-medium">
                {translations[language].stat1}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">25,000+</div>
              <div className="text-green-100 font-medium">
                {translations[language].stat2}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-green-100 font-medium">
                {translations[language].stat3}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">12+</div>
              <div className="text-green-100 font-medium">
                {translations[language].stat4}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-green-900">
              {language === 'ar' 
                ? 'كن جزءاً من التغيير الإيجابي' 
                : 'Be Part of the Positive Change'
              }
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'ar'
                ? 'كل تبرع، كبيراً كان أم صغيراً، يساهم في بناء مستقبل أفضل لسوريا'
                : 'Every donation, big or small, contributes to building a better future for Syria'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {translations[language].joinUs}
              </button>
              <button className="bg-white text-green-700 px-8 py-3 rounded-full text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-300 shadow-lg">
                {translations[language].learnMore}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;