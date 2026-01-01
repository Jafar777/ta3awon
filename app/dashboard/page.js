// C:\Users\jafar\Desktop\ta3awon\app\dashboard\page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useLanguage } from '@/context/LanguageContext';
import { FaBell } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { 
  FaUsers, 
  FaHandHoldingUsd, 
  FaBullhorn,  // Changed from FaCampaign to FaBullhorn (more appropriate for campaigns)
  FaChartLine,
  FaCalendar,
  FaArrowUp,
  FaArrowDown,
  FaChevronRight  // Added this for the quick actions section
} from 'react-icons/fa';

const DashboardPage = () => {
  const { language } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalDonations: 25480,
    activeCampaigns: 6,
    totalDonors: 892,
    monthlyGrowth: 12.5
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'ar' ? 'جاري تحميل لوحة التحكم...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: language === 'ar' ? 'إجمالي التبرعات' : 'Total Donations',
      value: `$${stats.totalDonations.toLocaleString()}`,
      icon: <FaHandHoldingUsd className="text-3xl" />,
      color: 'from-green-500 to-green-600',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: language === 'ar' ? 'الحملات النشطة' : 'Active Campaigns',
      value: stats.activeCampaigns.toString(),
      icon: <FaBullhorn className="text-3xl" />,  // Changed to FaBullhorn
      color: 'from-blue-500 to-blue-600',
      change: '+2',
      trend: 'up'
    },
    {
      title: language === 'ar' ? 'إجمالي المتبرعين' : 'Total Donors',
      value: stats.totalDonors.toLocaleString(),
      icon: <FaUsers className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
      change: '+45',
      trend: 'up'
    },
    {
      title: language === 'ar' ? 'النمو الشهري' : 'Monthly Growth',
      value: `${stats.monthlyGrowth}%`,
      icon: <FaChartLine className="text-3xl" />,
      color: 'from-orange-500 to-orange-600',
      change: '+3.2%',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { id: 1, user: 'أحمد محمد', action: language === 'ar' ? 'تبرع بمبلغ' : 'donated', amount: '$500', campaign: 'مدرسة الرحمة', time: '2 ساعات' },
    { id: 2, user: 'منى العلي', action: language === 'ar' ? 'أنشأت حملة' : 'created campaign', amount: '', campaign: 'العيادة الطبية', time: '5 ساعات' },
    { id: 3, user: 'سامر الحسن', action: language === 'ar' ? 'شارك حملة' : 'shared campaign', amount: '', campaign: 'المياه النظيفة', time: 'يوم واحد' },
    { id: 4, user: 'لينا أحمد', action: language === 'ar' ? 'تبرع بمبلغ' : 'donated', amount: '$200', campaign: 'المأوى الشتوي', time: 'يومين' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar/>
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'مرحباً بعودتك' : 'Welcome back'}, {session?.user?.firstName} 👋
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'ar' 
                ? 'إليك نظرة عامة على أداء منصتك وتفاعل المتبرعين' 
                : 'Here is an overview of your platform performance and donor engagement'}
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {language === 'ar' ? 'آخر تحديث: الآن' : 'Last updated: Just now'}
              </span>
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <FaCalendar className="mr-2" />
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Charts and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {language === 'ar' ? 'النشاطات الأخيرة' : 'Recent Activities'}
                  </h2>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                          <FaDonate className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            <span className="font-bold">{activity.user}</span> {activity.action} {activity.amount && <span className="text-green-600">{activity.amount}</span>}
                          </p>
                          <p className="text-sm text-gray-500">
                            {language === 'ar' ? 'حملة' : 'Campaign'}: {activity.campaign}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time} {language === 'ar' ? 'مضت' : 'ago'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Notifications */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200">
                        <FaBullhorn className="text-green-600" />  {/* Changed to FaBullhorn */}
                      </div>
                      <span className="font-medium text-gray-900">
                        {language === 'ar' ? 'إنشاء حملة جديدة' : 'Create New Campaign'}
                      </span>
                    </div>
                    <FaChevronRight className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200">
                        <FaDonate className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {language === 'ar' ? 'تقديم تبرع' : 'Make a Donation'}
                      </span>
                    </div>
                    <FaChevronRight className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200">
                        <FaEye className="text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {language === 'ar' ? 'عرض التقارير' : 'View Reports'}
                      </span>
                    </div>
                    <FaChevronRight className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FaBell className="mr-2 text-yellow-500" />
                    {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                  </h2>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">3 جديد</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <FaDonate className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {language === 'ar' ? 'تبرع جديد بقيمة $500' : 'New donation of $500'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 ساعة مضت</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <FaUsers className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {language === 'ar' ? '5 متبرعين جدد اليوم' : '5 new donors today'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">5 ساعات مضت</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;