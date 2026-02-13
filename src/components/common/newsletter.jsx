import { useState } from 'react';
import { Link } from 'react-router-dom';  // <- ADD THIS LINE
import { subscriberAPI } from '../../services/api';
import { FiMail, FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Check if email field is empty
    if (!email.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in your email address.',
      });
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await subscriberAPI.subscribe(email);
      setStatus({
        type: 'success',
        message: '🎉 Successfully subscribed! You will be notified of new updates.',
      });
      setEmail('');
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      
      if (errorMessage === 'Email already subscribed') {
        setStatus({
          type: 'error',
          message: 'This email is already subscribed to our newsletter.',
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Subscription failed. Please try again later.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="newsletter-section" className="bg-sky-100 py-12 scroll-mt-32">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
            <FiMail className="text-3xl text-blue-900 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-serif font-bold text-blue-900 mb-4">
          Subscribe to Nation & Style
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest fashion news, cultural stories, and exclusive features delivered directly to your inbox every morning.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus({ type: '', message: '' });
              }}
              placeholder="Your email address"
              className={`flex-1 text-black px-4 py-3 border rounded focus:outline-none focus:border-secondary transition-colors ${
                status.type === 'error' ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  {status.type === 'success' ? <FiCheck /> : null}
                  <span>SUBSCRIBE</span>
                </>
              )}
            </button>
          </div>
          {status.message && (
            <div className={`mt-4 p-3 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              <p className={`text-sm font-medium ${
                status.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {status.message}
              </p>
            </div>
          )}
        </form>
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our <Link to="/privacy" className="underline hover:text-secondary">Privacy Policy</Link> and consent to receive updates.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;