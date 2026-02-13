import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import { getImageUrl } from '../../utils/helpers';

const TopStories = () => {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await articleAPI.getTopStories();
        setTopStories(response.data.data);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-2xl font-serif font-bold mb-6">TOP STORIES</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-3 animate-pulse">
              <div className="w-20 h-20 bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-6 sticky top-24">
      <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-secondary pb-2">
        TOP STORIES
      </h3>
      <div className="space-y-6">
        {topStories.map((article, index) => (
          <div key={article._id} className="flex space-x-3 group">
            <div className="flex-shrink-0">
              <Link to={`/article/${article.slug}`}>
                <img
                  src={getImageUrl(article.featuredImage)}
                  alt={article.title}
                  className="w-20 h-20 object-cover group-hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
            <div className="flex-1 min-w-0">
              <Link
                to={`/category/${article.category?.slug}`}
                className="text-xs font-bold text-secondary hover:text-secondary-dark uppercase"
              >
                {article.category?.name}
              </Link>
              <h4 className="text-sm font-semibold line-clamp-2 mt-1">
                <Link
                  to={`/article/${article.slug}`}
                  className="hover:text-secondary transition-colors"
                >
                  {article.title}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStories;