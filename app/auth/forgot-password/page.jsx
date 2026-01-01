// C:\Users\jafar\Desktop\ta3awon\app\auth\forgot-password\page.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset code');
      }

      setMessage(
        language === 'ar' 
          ? 'تم إرسال رمز إعادة التعيين إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.' 
          : 'Reset code has been sent to your email. Please check your inbox.'
      );
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="text-left">
          <Link 
            href="/auth/signin" 
            className="inline-flex items-center text-sm text-green-600 hover:text-green-500"
          >
            <FaArrowLeft className="mr-2" />
            {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mb-4">
            <FaPaperPlane className="text-2xl text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' 
              ? 'أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين كلمة المرور' 
              : 'Enter your email and we will send you a code to reset your password'}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Messages */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pr-3">
                <FaPaperPlane className="h-5 w-5 text-green-500 group-hover:text-green-400" />
              </span>
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                </span>
              ) : (
                language === 'ar' ? 'إرسال رمز إعادة التعيين' : 'Send Reset Code'
              )}
            </button>
          </div>

          {/* Reset Code Form Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'هل لديك الرمز بالفعل؟' : 'Already have the code?'}{' '}
              <Link 
                href="/auth/reset-password" 
                className="font-medium text-green-600 hover:text-green-500"
              >
                {language === 'ar' ? 'أدخل الرمز' : 'Enter code'}
              </Link>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            {language === 'ar' ? 'ملاحظة' : 'Note'}
          </h4>
          <p className="text-xs text-yellow-700">
            {language === 'ar' 
              ? 'سيصلك رمز مكون من 6 أرقام إلى بريدك الإلكتروني. صالح لمدة ساعة واحدة.' 
              : 'You will receive a 6-digit code in your email. Valid for 1 hour.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;