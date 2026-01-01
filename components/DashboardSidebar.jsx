// components/DashboardSidebar.jsx - Updated version
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBullhorn,
  FaUserCircle, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCog,
  FaChartBar,
  FaHandHoldingUsd,
  FaBell,
  FaChevronRight
} from 'react-icons/fa';

const DashboardSidebar = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userStats, setUserStats] = useState({
    totalDonations: 0,
    totalDonated: 0
  });

  const isAdmin = session?.user?.role === 'admin';
  const isModerator = session?.user?.role === 'moderator' || isAdmin;

  // Fetch user stats
  const fetchUserStats = async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/users/${session.user.id}/stats`);
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStats();
    }
  }, [session]);

  const menuItems = [
    {
      name: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      href: '/dashboard',
      icon: <FaTachometerAlt />,
      roles: ['user', 'moderator', 'admin']
    },
    {
      name: language === 'ar' ? 'الحملات' : 'Campaigns',
      href: '/dashboard/campaigns',
      icon: <FaBullhorn />,
      roles: ['moderator', 'admin']
    },
    {
      name: language === 'ar' ? 'المستخدمين' : 'Users',
      href: '/dashboard/users',
      icon: <FaUsers />,
      roles: ['admin']
    },
    {
      name: language === 'ar' ? 'التبرعات' : 'Donations',
      href: '/dashboard/donations',
      icon: <FaHandHoldingUsd />,
      roles: ['moderator', 'admin']
    },
    {
      name: language === 'ar' ? 'التقارير' : 'Reports',
      href: '/dashboard/reports',
      icon: <FaChartBar />,
      roles: ['admin']
    },
    {
      name: language === 'ar' ? 'الملف الشخصي' : 'Profile',
      href: '/dashboard/profile',
      icon: <FaUserCircle />,
      roles: ['user', 'moderator', 'admin']
    },
    {
      name: language === 'ar' ? 'الإشعارات' : 'Notifications',
      href: '/dashboard/notifications',
      icon: <FaBell />,
      roles: ['user', 'moderator', 'admin'],
      badge: 0 // Real badge count would come from API
    },
    {
      name: language === 'ar' ? 'الإعدادات' : 'Settings',
      href: '/dashboard/settings',
      icon: <FaCog />,
      roles: ['user', 'moderator', 'admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(session?.user?.role || 'user')
  );

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-green-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white 
        transition-all duration-300 ease-in-out z-40 flex flex-col
        shadow-2xl
      `}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {language === 'ar' ? 'ت' : 'T'}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </h2>
                  <p className="text-xs text-green-200">
                    {session?.user?.role === 'admin' ? (language === 'ar' ? 'مدير' : 'Admin') :
                     session?.user?.role === 'moderator' ? (language === 'ar' ? 'مشرف' : 'Moderator') :
                     (language === 'ar' ? 'مستخدم' : 'User')}
                  </p>
                </div>
              </div>
            )}
            {!isSidebarOpen && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center mx-auto">
                <span className="text-lg font-bold">
                  {language === 'ar' ? 'ت' : 'T'}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block text-green-300 hover:text-white"
            >
              <FaChevronRight className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* User Info */}
        {isSidebarOpen && session?.user && (
          <div className="p-6 border-b border-green-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-300 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {session?.user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-green-900"></div>
              </div>
              <div>
                <h3 className="font-semibold">
                  {session.user.firstName} {session.user.lastName}
                </h3>
                <p className="text-sm text-green-200">
                  {session.user.email}
                </p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-700 rounded-full capitalize">
                  {language === 'ar' ? 
                    (session.user.role === 'admin' ? 'مدير' :
                     session.user.role === 'moderator' ? 'مشرف' : 'مستخدم') :
                    session.user.role
                  }
                </span>
              </div>
            </div>
            
            {/* Real User Stats */}
            {(session.user.role === 'user' && userStats.totalDonations > 0) && (
              <div className="mt-4 p-3 bg-green-800/50 rounded-lg">
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'تبرعاتك' : 'Your Donations'}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-green-300">
                      {language === 'ar' ? 'عدد التبرعات' : 'Total Donations'}
                    </p>
                    <p className="text-lg font-bold">{userStats.totalDonations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-300">
                      {language === 'ar' ? 'إجمالي التبرع' : 'Total Donated'}
                    </p>
                    <p className="text-lg font-bold">
                      ${userStats.totalDonated?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg 
                      transition-all duration-300 group
                      ${isActive 
                        ? 'bg-green-700 text-white shadow-lg' 
                        : 'text-green-100 hover:bg-green-800 hover:text-white'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`text-lg ${isActive ? 'text-green-300' : 'text-green-400 group-hover:text-green-300'}`}>
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <>
                        <span className="flex-1 font-medium">{item.name}</span>
                        {item.badge > 0 && (
                          <span className="px-2 py-1 text-xs bg-red-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {isActive && (
                          <FaChevronRight className="text-green-300" />
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-green-700">
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 group"
          >
            <FaSignOutAlt />
            {isSidebarOpen && (
              <span className="font-medium">
                {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              </span>
            )}
          </button>
          
          {isSidebarOpen && (
            <div className="mt-4 text-center">
              <p className="text-xs text-green-300">
                {language === 'ar' ? 'منصة تعاون السورية' : 'Syrian Cooperation Platform'}
              </p>
              <p className="text-xs text-green-400 mt-1">
                {new Date().getFullYear()} © Ta3awon
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;