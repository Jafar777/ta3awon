// C:\Users\jafar\Desktop\ta3awon\components\TopDonors.jsx
'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TopDonors = () => {
  const { language, translations } = useLanguage();
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        {language === 'ar' ? 'أكبر المتبرعين' : 'Top Donors'}
      </h3>
      
      {/* Donors Circles */}
      <div className="flex justify-center items-center mb-6">
        {/* Donor 1 */}
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-green-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            {translations[language].donor1}
          </div>
        </div>
        
        {/* Donor 2 */}
        <div className="relative group -ml-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-green-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            {translations[language].donor2}
          </div>
        </div>
      </div>
      
      {/* Total Donations */}
      <div className="text-center">
        <div className="text-green-200 mb-1">{translations[language].totalDonations}</div>
        <div className="text-white text-3xl font-bold">
          {translations[language].currency}25,480
        </div>
      </div>
    </div>
  );
};

export default TopDonors;