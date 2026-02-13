import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import { getImageUrl, formatDate } from '../../utils/helpers';

const HeroSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        const response = await articleAPI.getFeatured();
        if (response.data.data.length > 0) {
          setFeaturedArticle(response.data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching featured article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  if (loading) {
    return (
      <div className="relative h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!featuredArticle) return null;

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${getImageUrl(featuredArticle.featuredImage)})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto flex items-end pb-16">
        <div className="max-w-3xl text-white">
          {/* Category Badge */}
          <Link
            to={`/category/${featuredArticle.category?.slug}`}
            className="inline-block bg-secondary text-primary px-4 py-1 text-sm font-bold mb-4 hover:bg-secondary-light transition-colors uppercase"
          >
            {featuredArticle.category?.name}
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            <Link 
              to={`/article/${featuredArticle.slug}`}
              className="hover:text-secondary transition-colors"
            >
              {featuredArticle.title}
            </Link>
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-2">
            {featuredArticle.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="font-semibold">
              BY {featuredArticle.author?.name?.toUpperCase()}
            </span>
            <span>•</span>
            <span>{formatDate(featuredArticle.createdAt)}</span>
            <span>•</span>
            <span>{featuredArticle.readTime} MIN READ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;