import { useState } from 'react';
import { FiX, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onClose();
        navigate('/');
      } else {
        const response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onClose();
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Image Gallery */}
            <div className="hidden md:block bg-primary p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-dark opacity-90"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-serif font-bold text-blue-900 mb-2">
                    NATION <span className="text-yellow-400">&</span> STYLE
                  </h2>
                  <p className="text-blue-900 text-sm">Your gateway to fashion, culture, and lifestyle</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                    <div className="text-4xl font-bold text-blue-900 mb-2">1000+</div>
                    <div className="text-sm text-blue-900">Exclusive Articles</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                    <div className="text-4xl font-bold text-blue-900 mb-2">50K+</div>
                    <div className="text-sm text-gray-200">Active Readers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                    <div className="text-4xl font-bold text-blue-900 mb-2">24/7</div>
                    <div className="text-sm text-blue-900">Fresh Content</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                    <div className="text-4xl font-bold text-blue-900 mb-2">100+</div>
                    <div className="text-sm text-blue-900">Expert Writers</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-blue-900 text-sm">Access premium fashion insights and trends</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-blue-900 text-sm">Stay updated with breaking cultural news</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-blue-900 text-sm">Join our vibrant community of style enthusiasts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-blue-900 hover:text-blue-950 transition-colors"
              >
                <FiX size={24} />
              </button>

              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-3xl font-serif font-bold text-blue-900 mb-2">
                    {isLogin ? 'Welcome Back' : 'Join Nation & Style'}
                  </h3>
                  <p className="text-gray-600">
                    {isLogin 
                      ? 'Sign in to access exclusive content and features' 
                      : 'Create an account to unlock premium articles'}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field (Register Only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition-colors text-black"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 blue-900" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-blue-900 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 border border-black rounded-lg focus:outline-none focus:border-secondary transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-950"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password (Login Only) */}
                  {isLogin && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-secondary hover:text-blue-900 font-semibold"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-blue-900 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </button>
                </form>

                {/* Toggle Login/Register */}
                <div className="mt-6 text-center">
                  <p className="text-blue-900">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setFormData({ email: '', password: '', name: '' });
                      }}
                      className="text-blue-900y hover:text-blue-950 font-semibold"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-blue-950">OR</span>
                  </div>
                </div>

                {/* Social Login */}
                <button
                  type="button"
                  className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;