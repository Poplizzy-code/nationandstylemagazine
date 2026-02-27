import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import LoginModal from '../auth/loginmodal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { name: 'HOME', path: '/' },
    { name: 'NEWS', path: '/category/news' },
    { name: 'FASHION', path: '/category/fashion' },
    { name: 'LIFESTYLE', path: '/category/lifestyle' },
    { name: 'SPORTS', path: '/category/sports' },
    { name: 'FEATURES', path: '/category/features' },
    { name: 'ENTERTAINMENT', path: '/category/entertainment' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSubscribeClick = () => {
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        {/* Top Bar */}
        <div className="bg-blue-900 text-white py-2">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="hidden md:block">TRENDING. First Fashion Week</span>
              <span className="hidden md:block">|</span>
              <span className="hidden md:block">Global Markets</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSubscribeClick}
                className="hover:text-yellow-400 transition-colors"
              >
                Subscribe
              </button>
              {user ? (
                <>
                  <span className="hidden md:block">Welcome, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Login
                </button>
              )}
              <div className="flex space-x-3 ml-4">
                <a href="https://www.instagram.com/nationstylemagazine/" className="hover:text-yellow-400 transition-colors"><FiInstagram size={16} /></a>
                <a href="https://www.instagram.com/nationstylemagazine/" className="hover:text-yellow-400 transition-colors"><FiTwitter size={16} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-2xl text-blue-900"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-1 lg:flex-initial text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-blue-900">
                NATION <span className="text-yellow-400">&</span> STYLE
              </h1>
            </Link>

            {/* Search & Subscribe */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-xl text-blue-900 hover:text-yellow-400 transition-colors"
              >
                <FiSearch />
              </button>
              <button 
                onClick={handleSubscribeClick}
                className="hidden md:block bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors font-semibold"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`bg-white border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="container mx-auto">
            <ul className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8 py-4 lg:py-0">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="block py-3 lg:py-4 px-4 lg:px-0 text-sm font-semibold text-gray-700 hover:text-yellow-400 transition-colors uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-6 z-50">
            <div className="container mx-auto">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, categories, authors..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:border-yellow-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-r hover:bg-yellow-500 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;