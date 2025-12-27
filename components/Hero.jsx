// C:\Users\jafar\Desktop\ta3awon\components\Hero.jsx
"use client";
import React from "react";
import Image from "next/image";
import TopDonors from "./TopDoners";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { language, translations } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 bg-green-950">
      {/* Background with gradient corners */}
      <div className="absolute inset-0">
        {/* Light Green Center - Responsive */}
        <div className="absolute inset-4 sm:inset-8 md:inset-1/4 bg-gradient-to-r from-green-600 to-green-500 opacity-20 rounded-full blur-xl md:blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 md:py-0">
        {/* Mobile Layout (Stacked) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Mobile: Platform Name (Top) */}
          <div className="lg:hidden w-full text-center mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {translations[language].platformName}
            </h1>
          </div>

          {/* Mobile: Quran Verse (Under Platform Name) */}
          <div className="lg:hidden w-full text-center mb-6">
            <div className="relative inline-block max-w-md mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-green-100 font-arabic py-3 px-4 sm:py-4 sm:px-6 bg-white/5 rounded-2xl backdrop-blur-sm leading-relaxed">
                {translations[language].quranVerse}
              </p>
              <p className="text-green-200 mt-1 text-xs sm:text-sm">
                {language === "ar" ? "سورة المائدة ٢" : "Surah Al-Ma'idah: 2"}
              </p>
            </div>
          </div>

          {/* Desktop: Left Side - Top Donors Only */}
          <div className="hidden lg:block lg:w-1/5 text-center lg:text-right space-y-8">
            <div className="mt-8">
              <TopDonors />
            </div>
          </div>

          {/* Center Section - Charity Image */}
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center order-2 lg:order-none">
            
            {/* Desktop: Platform Name */}
            <div className="hidden lg:block text-center mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {translations[language].platformName}
              </h1>
            </div>

            {/* Desktop: Quran Verse */}
            <div className="hidden lg:block relative mb-6">
              <p className="text-2xl lg:text-3xl text-green-100 font-arabic py-4 px-6 bg-white/5 rounded-2xl backdrop-blur-sm leading-relaxed">
                {translations[language].quranVerse}
              </p>
              <p className="text-green-200 mt-2 text-sm">
                {language === "ar" ? "سورة المائدة ٢" : "Surah Al-Ma'idah: 2"}
              </p>
            </div>

            {/* Charity Image - Responsive Sizing */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mb-6 md:mb-8">
              <Image
                src="/charity.png"
                alt="Charity"
                fill
                className="object-contain animate-float"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px, 320px"
              />
            </div>

            {/* Mobile: Top Donors (Below Image) */}
            <div className="lg:hidden w-full max-w-xs mx-auto mb-8">
              <TopDonors />
            </div>
          </div>

          {/* Right Side - Donate Section */}
          <div className="w-full lg:w-1/5 text-center lg:text-left space-y-6 md:space-y-8 order-3 lg:order-none">
            
            {/* Mobile: Donate Section above Stats on Mobile */}
            <div className="space-y-4 md:space-y-6">
              
              {/* Donate Text - Different on Mobile vs Desktop */}
              <div className="lg:hidden">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                  {translations[language].donateText}
                </h2>
                <p className="text-green-100 text-sm sm:text-base mb-4">
                  {language === "ar"
                    ? "ساهم معنا في إعادة بناء سوريا وتقديم الدعم للمحتاجين"
                    : "Join us in rebuilding Syria and providing support for those in need"}
                </p>
              </div>

              <div className="hidden lg:block space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {translations[language].donateText}
                </h2>
                <p className="text-green-100 text-lg">
                  {language === "ar"
                    ? "ساهم معنا في إعادة بناء سوريا وتقديم الدعم للمحتاجين"
                    : "Join us in rebuilding Syria and providing support for those in need"}
                </p>
              </div>

              {/* Donate Button - Responsive */}
              <button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl md:shadow-2xl">
                {translations[language].donateButton}
              </button>
            </div>

            {/* Stats - Responsive Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6">
              <div className="text-center p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl backdrop-blur-sm">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">120+</div>
                <div className="text-green-200 text-xs sm:text-sm md:text-base mt-1">
                  {language === "ar" ? "حملة" : "Campaigns"}
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl backdrop-blur-sm">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">5K+</div>
                <div className="text-green-200 text-xs sm:text-sm md:text-base mt-1">
                  {language === "ar" ? "متبرع" : "Donors"}
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl backdrop-blur-sm">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">80+</div>
                <div className="text-green-200 text-xs sm:text-sm md:text-base mt-1">
                  {language === "ar" ? "مشروع" : "Projects"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Only: Additional Spacing */}
        <div className="lg:hidden mt-8"></div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;