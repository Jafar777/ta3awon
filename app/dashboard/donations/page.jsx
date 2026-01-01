// app/dashboard/donations/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaDownload,
  FaCalendar,
  FaUser,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUndo,
  FaChartLine,
  FaUsers,
  FaDonate,
  FaCalendarAlt,
  FaBuilding
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DonationsPage = () => {
  const { language } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    pendingDonations: 0,
    averageDonation: 0
  });
  const [recentDonors, setRecentDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Fetch donations
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedStatus !== 'all') queryParams.append('status', selectedStatus);
      if (searchTerm) queryParams.append('search', searchTerm);
      if (selectedCampaign) queryParams.append('campaignId', selectedCampaign);
      if (dateRange.startDate) queryParams.append('startDate', dateRange.startDate);
      if (dateRange.endDate) queryParams.append('endDate', dateRange.endDate);
      
      const response = await fetch(`/api/admin/donations?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        setDonations(data.donations || []);
        setStats(data.stats || stats);
        setRecentDonors(data.stats?.recentDonors || []);
      } else {
        toast.error(data.error || 'Failed to fetch donations');
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast.error('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    
    if (session?.user?.role !== 'admin' && session?.user?.role !== 'moderator') {
      router.push('/dashboard');
    }
    
    if (session?.user?.role === 'admin' || session?.user?.role === 'moderator') {
      fetchDonations();
    }
  }, [status, session, router, selectedStatus, searchTerm, selectedCampaign, dateRange]);

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <FaCheckCircle className="text-green-600" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <FaClock className="text-yellow-600" />
        };
      case 'failed':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <FaTimesCircle className="text-red-600" />
        };
      case 'refunded':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <FaUndo className="text-blue-600" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <FaClock className="text-gray-600" />
        };
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      case 'pending': return language === 'ar' ? 'قيد الانتظار' : 'Pending';
      case 'failed': return language === 'ar' ? 'فشل' : 'Failed';
      case 'refunded': return language === 'ar' ? 'مسترجع' : 'Refunded';
      default: return status;
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'stripe': return <FaCreditCard className="text-blue-600" />;
      case 'bank_transfer': return <FaBuilding className="text-green-600" />;
      case 'paypal': return <FaMoneyBillWave className="text-blue-500" />;
      case 'cash': return <FaMoneyBillWave className="text-green-600" />;
      default: return <FaCreditCard className="text-gray-600" />;
    }
  };

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export donations
  const handleExport = () => {
    // Implement export functionality
    toast.success('Export functionality will be implemented soon');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language === 'ar' ? 'إدارة التبرعات' : 'Donations Management'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {language === 'ar' 
                    ? 'عرض وتتبع جميع التبرعات' 
                    : 'View and track all donations'}
                </p>
              </div>
              
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors duration-300 flex items-center"
              >
                <FaDownload className="mr-2" />
                {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
              </button>
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إجمالي التبرعات' : 'Total Donations'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalDonations?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaDonate className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إجمالي المبلغ' : 'Total Amount'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalAmount)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaMoneyBillWave className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'متوسط التبرع' : 'Average Donation'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.averageDonation)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FaChartLine className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'قيد الانتظار' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pendingDonations?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن متبرع أو معاملة...' : 'Search donor or transaction...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                >
                  <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
                  <option value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                  <option value="pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
                  <option value="failed">{language === 'ar' ? 'فشل' : 'Failed'}</option>
                  <option value="refunded">{language === 'ar' ? 'مسترجع' : 'Refunded'}</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={language === 'ar' ? 'من تاريخ' : 'From date'}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={language === 'ar' ? 'إلى تاريخ' : 'To date'}
                />
              </div>
            </div>
          </div>

          {/* Recent Donors */}
          {recentDonors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'أحدث المتبرعين' : 'Recent Donors'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="bg-white rounded-xl shadow p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {donor.donor?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {donor.donor?.firstName} {donor.donor?.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(donor.totalDonated)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {donor.donationCount} {language === 'ar' ? 'تبرع' : 'donations'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donations Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'المتبرع' : 'Donor'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الحملة' : 'Campaign'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'المبلغ' : 'Amount'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => {
                    const statusInfo = getStatusInfo(donation.status);
                    return (
                      <tr key={donation._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {donation.isAnonymous ? '?' : donation.donorName?.charAt(0) || donation.donorId?.firstName?.charAt(0) || 'U'}
                                </span>
                              </div>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {donation.isAnonymous 
                                  ? (language === 'ar' ? 'مجهول' : 'Anonymous')
                                  : donation.donorName || `${donation.donorId?.firstName} ${donation.donorId?.lastName}`
                                }
                              </div>
                              <div className="text-sm text-gray-500">
                                {donation.isAnonymous ? '' : donation.donorEmail || donation.donorId?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {donation.campaignId?.image?.url && (
                              <div className="flex-shrink-0 h-10 w-10">
                                <img 
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={donation.campaignId.image.url}
                                  alt={donation.campaignId.title}
                                />
                              </div>
                            )}
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {donation.campaignId?.title || 'Unknown Campaign'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            {formatCurrency(donation.amount, donation.currency)}
                          </div>
                          {donation.transactionId && (
                            <div className="text-xs text-gray-500">
                              ID: {donation.transactionId.substring(0, 8)}...
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getPaymentMethodIcon(donation.paymentMethod)}
                            <span className="mr-2 text-sm text-gray-900">
                              {donation.paymentMethod === 'stripe' ? 'Stripe' :
                               donation.paymentMethod === 'bank_transfer' ? (language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer') :
                               donation.paymentMethod === 'paypal' ? 'PayPal' :
                               donation.paymentMethod === 'cash' ? (language === 'ar' ? 'نقدي' : 'Cash') :
                               donation.paymentMethod}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span className="mr-2">{getStatusText(donation.status)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(donation.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => router.push(`/dashboard/donations/${donation._id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {donations.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaDonate className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد تبرعات' : 'No donations found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'لا توجد تبرعات مطابقة لبحثك' 
                  : 'No donations match your search criteria'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {donations.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {language === 'ar' ? 'عرض' : 'Showing'} {donations.length} {language === 'ar' ? 'من أصل' : 'of'} {stats.totalDonations} {language === 'ar' ? 'تبرع' : 'donations'}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </button>
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                  {language === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DonationsPage;