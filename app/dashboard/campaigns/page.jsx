// app/dashboard/campaigns/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash,
  FaEye,
  FaChartLine,
  FaDonate,
  FaCalendar,
  FaUsers,
  FaTimes,
  FaUpload,
  FaUniversity, // Changed from FaBank to FaUniversity (correct icon name)
  FaCreditCard,
  FaUser,
  FaBuilding,
  FaMoneyBillAlt // Alternative for bank icon
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CampaignsPage = () => {
  const { language } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalRaised: 0,
    totalDonors: 0,
    averageDonation: 0
  });
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Campaign Form State
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    category: 'education',
    targetAmount: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    iban: '',
    swiftCode: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedStatus !== 'all') queryParams.append('status', selectedStatus);
      if (searchTerm) queryParams.append('search', searchTerm);
      
      const response = await fetch(`/api/admin/campaigns?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        setCampaigns(data.campaigns || []);
        setStats(data.stats || stats);
      } else {
        toast.error(data.error || 'Failed to fetch campaigns');
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to fetch campaigns');
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
      fetchCampaigns();
    }
  }, [status, session, router, selectedStatus, searchTerm]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setNewCampaign({ ...newCampaign, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  // Create new campaign
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newCampaign.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!newCampaign.description.trim()) {
      toast.error('Description is required');
      return;
    }
    
    if (!newCampaign.targetAmount || newCampaign.targetAmount <= 0) {
      toast.error('Valid target amount is required');
      return;
    }
    
    if (!newCampaign.bankName.trim() || !newCampaign.accountNumber.trim() || !newCampaign.accountHolderName.trim()) {
      toast.error('Bank account details are required');
      return;
    }
    
    if (!newCampaign.image) {
      toast.error('Campaign image is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // First upload image
      const imageFormData = new FormData();
      imageFormData.append('image', newCampaign.image);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData
      });
      
      const imageData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(imageData.error || 'Failed to upload image');
      }
      
      // Then create campaign
      const campaignData = {
        ...newCampaign,
        image: imageData,
        targetAmount: parseFloat(newCampaign.targetAmount)
      };
      
      const response = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campaignData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Campaign created successfully!');
        setShowCreateModal(false);
        resetForm();
        fetchCampaigns(); // Refresh list
      } else {
        toast.error(data.error || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error(error.message || 'Failed to create campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete campaign
  const handleDeleteCampaign = async (campaignId) => {
    if (!confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/campaigns?id=${campaignId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Campaign deleted successfully');
        fetchCampaigns(); // Refresh list
      } else {
        toast.error(data.error || 'Failed to delete campaign');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  };

  // Reset form
  const resetForm = () => {
    setNewCampaign({
      title: '',
      description: '',
      category: 'education',
      targetAmount: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      iban: '',
      swiftCode: '',
      image: null
    });
    setImagePreview(null);
  };

  // Get status color and text
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return language === 'ar' ? 'نشط' : 'Active';
      case 'pending': return language === 'ar' ? 'قيد المراجعة' : 'Pending';
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      default: return status;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
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
                  {language === 'ar' ? 'إدارة الحملات' : 'Campaigns Management'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {language === 'ar' 
                    ? 'إدارة وتتبع جميع حملات التبرع' 
                    : 'Manage and track all donation campaigns'}
                </p>
              </div>
              
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-colors duration-300 flex items-center"
              >
                <FaPlus className="mr-2" />
                {language === 'ar' ? 'حملة جديدة' : 'New Campaign'}
              </button>
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'الحملات النشطة' : 'Active Campaigns'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaChartLine className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إجمالي التبرعات' : 'Total Raised'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalRaised)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaDonate className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إجمالي المتبرعين' : 'Total Donors'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FaUsers className="text-purple-600 text-xl" />
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
                <div className="p-3 bg-orange-100 rounded-xl">
                  <FaCalendar className="text-orange-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن حملة...' : 'Search campaigns...'}
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
                  <option value="active">{language === 'ar' ? 'نشط' : 'Active'}</option>
                  <option value="pending">{language === 'ar' ? 'قيد المراجعة' : 'Pending'}</option>
                  <option value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                  <option value="">{language === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                  <option value="education">{language === 'ar' ? 'التعليم' : 'Education'}</option>
                  <option value="healthcare">{language === 'ar' ? 'الصحة' : 'Healthcare'}</option>
                  <option value="infrastructure">{language === 'ar' ? 'البنية التحتية' : 'Infrastructure'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Campaign Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={campaign.image?.url || '/default-campaign.jpg'} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campaign Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </span>
                      <span className="mr-2 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {language === 'ar' ? 
                          (campaign.category === 'education' ? 'التعليم' : 
                           campaign.category === 'healthcare' ? 'الصحة' : 
                           campaign.category === 'infrastructure' ? 'البنية التحتية' : campaign.category)
                          : campaign.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button 
                        onClick={() => router.push(`/campaigns/${campaign._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => router.push(`/dashboard/campaigns/edit/${campaign._id}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteCampaign(campaign._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{formatCurrency(campaign.amountRaised || 0)}</span>
                      <span>{formatCurrency(campaign.targetAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        style={{ 
                          width: `${Math.min(100, ((campaign.amountRaised || 0) / campaign.targetAmount) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{Math.round(((campaign.amountRaised || 0) / campaign.targetAmount) * 100)}%</span>
                      <span>
                        {campaign.endDate ? 
                          `${Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24))} ${language === 'ar' ? 'يوم' : 'days'}` : 
                          language === 'ar' ? 'مستمر' : 'Ongoing'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(campaign.amountRaised || 0)}
                      </p>
                      <p className="text-xs text-gray-600">{language === 'ar' ? 'مجموع' : 'Raised'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{campaign.donorsCount || 0}</p>
                      <p className="text-xs text-gray-600">{language === 'ar' ? 'متبرع' : 'Donors'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {campaign.bankName ? `${campaign.bankName.substring(0, 8)}...` : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600">{language === 'ar' ? 'البنك' : 'Bank'}</p>
                    </div>
                  </div>
                </div>

                {/* Campaign Actions */}
                <div className="px-6 pb-6">
                  <button 
                    onClick={() => router.push(`/campaigns/${campaign._id}`)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-colors duration-300"
                  >
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {campaigns.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaDonate className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد حملات' : 'No campaigns found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'لا توجد حملات مطابقة لبحثك' 
                  : 'No campaigns match your search criteria'}
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-colors duration-300"
              >
                {language === 'ar' ? 'إنشاء أول حملة' : 'Create First Campaign'}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'إنشاء حملة جديدة' : 'Create New Campaign'}
              </h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateCampaign} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  {/* Campaign Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'عنوان الحملة' : 'Campaign Title'} *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newCampaign.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'ar' ? 'أدخل عنوان الحملة' : 'Enter campaign title'}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'وصف الحملة' : 'Campaign Description'} *
                    </label>
                    <textarea
                      name="description"
                      value={newCampaign.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={language === 'ar' ? 'أدخل وصف الحملة' : 'Enter campaign description'}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الفئة' : 'Category'} *
                    </label>
                    <select
                      name="category"
                      value={newCampaign.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="education">{language === 'ar' ? 'التعليم' : 'Education'}</option>
                      <option value="healthcare">{language === 'ar' ? 'الصحة' : 'Healthcare'}</option>
                      <option value="infrastructure">{language === 'ar' ? 'البنية التحتية' : 'Infrastructure'}</option>
                      <option value="shelter">{language === 'ar' ? 'المأوى' : 'Shelter'}</option>
                      <option value="food">{language === 'ar' ? 'الغذاء' : 'Food'}</option>
                      <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                    </select>
                  </div>

                  {/* Target Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المبلغ المستهدف (USD)' : 'Target Amount (USD)'} *
                    </label>
                    <input
                      type="number"
                      name="targetAmount"
                      value={newCampaign.targetAmount}
                      onChange={handleInputChange}
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Right Column - Bank & Image */}
                <div className="space-y-4">
                  {/* Bank Account Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <FaUniversity className="mr-2 text-green-600" /> {/* Changed from FaBank */}
                      {language === 'ar' ? 'تفاصيل الحساب البنكي' : 'Bank Account Details'} *
                    </h3>
                    
                    {/* Bank Name */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'ar' ? 'اسم البنك' : 'Bank Name'} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FaBuilding className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="bankName"
                          value={newCampaign.bankName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder={language === 'ar' ? 'اسم البنك' : 'Bank name'}
                          required
                        />
                      </div>
                    </div>

                    {/* Account Number */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'ar' ? 'رقم الحساب' : 'Account Number'} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FaCreditCard className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="accountNumber"
                          value={newCampaign.accountNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder={language === 'ar' ? 'رقم الحساب' : 'Account number'}
                          required
                        />
                      </div>
                    </div>

                    {/* Account Holder Name */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'ar' ? 'اسم صاحب الحساب' : 'Account Holder Name'} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="accountHolderName"
                          value={newCampaign.accountHolderName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder={language === 'ar' ? 'اسم صاحب الحساب' : 'Account holder name'}
                          required
                        />
                      </div>
                    </div>

                    {/* IBAN (Optional) */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'ar' ? 'رقم الأيبان (اختياري)' : 'IBAN (Optional)'}
                      </label>
                      <input
                        type="text"
                        name="iban"
                        value={newCampaign.iban}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="XX00 XXXX 0000 0000 0000 00"
                      />
                    </div>

                    {/* SWIFT Code (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'ar' ? 'رمز سويفت (اختياري)' : 'SWIFT Code (Optional)'}
                      </label>
                      <input
                        type="text"
                        name="swiftCode"
                        value={newCampaign.swiftCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="XXXXXX00"
                      />
                    </div>
                  </div>

                  {/* Campaign Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'صورة الحملة' : 'Campaign Image'} *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNewCampaign({ ...newCampaign, image: null });
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center py-8"
                        >
                          <FaUpload className="text-4xl text-gray-400 mb-2" />
                          <p className="text-gray-600">
                            {language === 'ar' ? 'انقر لرفع الصورة' : 'Click to upload image'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {language === 'ar' ? 'جاري الإنشاء...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" />
                      {language === 'ar' ? 'إنشاء الحملة' : 'Create Campaign'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;