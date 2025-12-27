// C:\Users\jafar\Desktop\ta3awon\components\Campaigns.jsx
'use client';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaSchool, FaHospital, FaTint, FaHome, FaGraduationCap, FaSeedling, FaUsers, FaClock, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Campaigns = () => {
  const { language, translations } = useLanguage();
  const [filter, setFilter] = useState('all');

  // Dummy campaign data
  const campaigns = [
    {
      id: 1,
      title: translations[language].campaign1Title,
      description: translations[language].campaign1Desc,
      category: translations[language].category1,
      icon: <FaSchool className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      raised: 12500,
      target: 25000,
      donors: 342,
      daysLeft: 15,
      progress: 50,
      urgent: false,
      featured: true,
      image: "/campaign-school.jpg" // You can add actual images
    },
    {
      id: 2,
      title: translations[language].campaign2Title,
      description: translations[language].campaign2Desc,
      category: translations[language].category2,
      icon: <FaHospital className="text-2xl" />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      raised: 75000,
      target: 150000,
      donors: 892,
      daysLeft: 8,
      progress: 50,
      urgent: true,
      featured: true,
      image: "/campaign-medical.jpg"
    },
    {
      id: 3,
      title: translations[language].campaign3Title,
      description: translations[language].campaign3Desc,
      category: translations[language].category3,
      icon: <FaTint className="text-2xl" />,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      raised: 42000,
      target: 80000,
      donors: 567,
      daysLeft: 45,
      progress: 52.5,
      urgent: false,
      featured: false,
      image: "/campaign-water.jpg"
    },
    {
      id: 4,
      title: translations[language].campaign4Title,
      description: translations[language].campaign4Desc,
      category: translations[language].category5,
      icon: <FaHome className="text-2xl" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      raised: 18000,
      target: 40000,
      donors: 231,
      daysLeft: 22,
      progress: 45,
      urgent: true,
      featured: false,
      image: "/campaign-shelter.jpg"
    },
    {
      id: 5,
      title: translations[language].campaign5Title,
      description: translations[language].campaign5Desc,
      category: translations[language].category6,
      icon: <FaGraduationCap className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      raised: 32000,
      target: 60000,
      donors: 412,
      daysLeft: 60,
      progress: 53.3,
      urgent: false,
      featured: true,
      image: "/campaign-training.jpg"
    },
    {
      id: 6,
      title: translations[language].campaign6Title,
      description: translations[language].campaign6Desc,
      category: translations[language].category4,
      icon: <FaSeedling className="text-2xl" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      raised: 28000,
      target: 50000,
      donors: 298,
      daysLeft: 38,
      progress: 56,
      urgent: false,
      featured: false,
      image: "/campaign-agriculture.jpg"
    },
  ];

  // Filter categories
  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All' },
    { id: 'education', name: translations[language].category1 },
    { id: 'healthcare', name: translations[language].category2 },
    { id: 'infrastructure', name: translations[language].category3 },
    { id: 'food', name: translations[language].category4 },
    { id: 'shelter', name: translations[language].category5 },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    if (filter === 'education') return campaign.category === translations[language].category1;
    if (filter === 'healthcare') return campaign.category === translations[language].category2;
    if (filter === 'infrastructure') return campaign.category === translations[language].category3;
    if (filter === 'food') return campaign.category === translations[language].category4;
    if (filter === 'shelter') return campaign.category === translations[language].category5;
    return true;
  });

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section id="campaigns" className="relative py-16 md:py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-green-200 blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-green-100 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold mb-4">
            {language === 'ar' ? 'المشاريع الاستراتيجية' : 'Strategic Projects'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            {translations[language].campaignsTitle}
          </h2>
          <p className="text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
            {translations[language].campaignsSubtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${filter === cat.id 
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-green-50 border border-green-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {filteredCampaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className={`group relative ${campaign.bgColor} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100`}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {campaign.urgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    {translations[language].urgent}
                  </span>
                )}
                {campaign.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                    {translations[language].featured}
                  </span>
                )}
              </div>

              {/* Campaign Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300">
                {/* Placeholder for image - you can replace with actual images */}
                <div className={`absolute inset-0 bg-gradient-to-br ${campaign.color} opacity-90`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-full ${campaign.iconBg} flex items-center justify-center text-white`}>
                      {campaign.icon}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className={`px-3 py-1 ${campaign.iconBg} text-gray-800 text-xs font-bold rounded-full`}>
                    {campaign.category}
                  </span>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {campaign.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span className="font-medium">{translations[language].raised}: {translations[language].currency}{formatNumber(campaign.raised)}</span>
                    <span className="font-medium">{translations[language].target}: {translations[language].currency}{formatNumber(campaign.target)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full bg-gradient-to-r ${campaign.color}`}
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{campaign.progress}%</span>
                    <span>{campaign.daysLeft} {translations[language].days}</span>
                  </div>
                </div>

                {/* Stats and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaUsers className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        {formatNumber(campaign.donors)} {translations[language].donors}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        {campaign.daysLeft} {translations[language].days}
                      </span>
                    </div>
                  </div>
                  <button className={`px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r ${campaign.color} hover:opacity-90 transition-all duration-300 text-sm`}>
                    {translations[language].donateNow}
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl shadow-2xl">
            <div className="text-left sm:text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' 
                  ? 'مستعد لدعم حملة أخرى؟' 
                  : 'Ready to Support Another Campaign?'
                }
              </h3>
              <p className="text-green-100 max-w-md">
                {language === 'ar'
                  ? 'استعرض جميع مشاريعنا الاستراتيجية واكتشف كيف يمكنك إحداث فرق أكبر'
                  : 'Browse all our strategic projects and discover how you can make an even bigger difference'
                }
              </p>
            </div>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 whitespace-nowrap">
              {translations[language].viewAllCampaigns}
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.raised, 0))}{translations[language].currency}
            </div>
            <div className="text-gray-600 font-medium">
              {language === 'ar' ? 'إجمالي التبرعات' : 'Total Raised'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.donors, 0))}
            </div>
            <div className="text-gray-600 font-medium">
              {language === 'ar' ? 'متبرع فعال' : 'Active Donors'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
              {campaigns.length}
            </div>
            <div className="text-gray-600 font-medium">
              {language === 'ar' ? 'حملة نشطة' : 'Active Campaigns'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
              94%
            </div>
            <div className="text-gray-600 font-medium">
              {language === 'ar' ? 'معدل النجاح' : 'Success Rate'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Campaigns;