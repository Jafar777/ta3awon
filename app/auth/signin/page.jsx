// C:\Users\jafar\Desktop\ta3awon\app\auth\signin\page.jsx
'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaSignInAlt, 
  FaUserPlus,
  FaUser,
  FaArrowRight
} from 'react-icons/fa';

const AuthPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Handle signup form changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      });

      if (result.error) {
        setError(
          result.error === 'CredentialsSignin' 
            ? (language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password')
            : result.error
        );
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

// In handleSignupSubmit function, after successful signup:
try {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  // Show success message
  setSuccess(
    language === 'ar' 
      ? 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.' 
      : 'Account created successfully! You can now sign in.'
  );
  
  // Clear form and switch to login
  setSignupData({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Auto-switch to login after 2 seconds
  setTimeout(() => {
    setIsSignUp(false);
    setSuccess('');
    
    // Pre-fill the login form with the new email
    setLoginData(prev => ({
      ...prev,
      email: data.user.email
    }));
  }, 2000);
  
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false);
}
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl text-white font-bold">ت</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSignUp 
              ? (language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account')
              : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
            }
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignUp
              ? (language === 'ar' 
                  ? 'انضم إلى منصة تعاون السورية وكن جزءاً من التغيير' 
                  : 'Join Syrian Cooperation Platform and be part of the change')
              : (language === 'ar' 
                  ? 'مرحباً بعودتك إلى منصة تعاون السورية' 
                  : 'Welcome back to Syrian Cooperation Platform')
            }
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              !isSignUp 
                ? 'bg-white text-green-700 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FaSignInAlt />
              <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            </div>
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              isSignUp 
                ? 'bg-white text-green-700 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FaUserPlus />
              <span>{language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}</span>
            </div>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fadeIn">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fadeIn">
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* LOGIN FORM */}
        {!isSignUp ? (
          <form className="mt-4 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword.password ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  >
                    {showPassword.password ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                  {language === 'ar' ? 'تذكرني' : 'Remember me'}
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  href="/auth/forgot-password" 
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </Link>
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
                  <FaSignInAlt className="h-5 w-5 text-green-500 group-hover:text-green-400" />
                </span>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                  </span>
                ) : (
                  language === 'ar' ? 'تسجيل الدخول' : 'Sign In'
                )}
              </button>
            </div>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form className="mt-4 space-y-6" onSubmit={handleSignupSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Name Fields - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name Field */}
                <div>
                  <label htmlFor="signup-firstname" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="signup-firstname"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder={language === 'ar' ? 'محمد' : 'John'}
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div>
                  <label htmlFor="signup-lastname" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="signup-lastname"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder={language === 'ar' ? 'أحمد' : 'Doe'}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword.password ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  >
                    {showPassword.password ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                  >
                    {showPassword.confirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'متطلبات كلمة المرور' : 'Password Requirements'}
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <FaArrowRight className="w-3 h-3 mr-2 text-green-500" />
                  {language === 'ar' ? '6 أحرف على الأقل' : 'At least 6 characters'}
                </li>
                <li className="flex items-center">
                  <FaArrowRight className="w-3 h-3 mr-2 text-green-500" />
                  {language === 'ar' ? 'يجب أن تحتوي على حروف وأرقام' : 'Must contain letters and numbers'}
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pr-3">
                  <FaUserPlus className="h-5 w-5 text-green-500 group-hover:text-green-400" />
                </span>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                  </span>
                ) : (
                  language === 'ar' ? 'إنشاء حساب' : 'Create Account'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Demo Credentials (Only shown on login) */}
        {!isSignUp && (
          <>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {language === 'ar' ? 'أو' : 'Or'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'بيانات تجريبية' : 'Demo Credentials'}
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>{language === 'ar' ? 'بريد إلكتروني:' : 'Email:'}</strong> demo@ta3awon.org</p>
                <p><strong>{language === 'ar' ? 'كلمة المرور:' : 'Password:'}</strong> demo123</p>
              </div>
            </div>
          </>
        )}

        {/* Toggle Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isSignUp
              ? (language === 'ar' ? 'هل لديك حساب بالفعل؟' : "Already have an account?")
              : (language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?")}{' '}
            <button
              onClick={toggleAuthMode}
              className="font-medium text-green-600 hover:text-green-500"
            >
              {isSignUp
                ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign in')
                : (language === 'ar' ? 'أنشئ حساباً جديداً' : 'Create new account')}
            </button>
          </p>
        </div>

        {/* Terms & Privacy */}
        {isSignUp && (
          <div className="text-center text-xs text-gray-500">
            <p>
              {language === 'ar' 
                ? 'بالنقر على "إنشاء حساب"، فإنك توافق على'
                : 'By clicking "Create Account", you agree to our'}{' '}
              <Link href="/terms" className="text-green-600 hover:text-green-500">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </Link>{' '}
              {language === 'ar' ? 'و' : 'and'}{' '}
              <Link href="/privacy" className="text-green-600 hover:text-green-500">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;