import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await articleAPI.getBreaking();
        setBreakingNews(response.data.data);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };

    fetchBreakingNews();
  }, []);

  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [breakingNews]);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-accent text-white py-2 overflow-hidden">
      <div className="container mx-auto flex items-center">
        <span className="bg-white text-accent px-4 py-1 font-bold text-sm mr-4 flex-shrink-0">
          BREAKING
        </span>
        <div className="flex-1 overflow-hidden">
          <Link
            to={`/article/${breakingNews[currentIndex]?.slug}`}
            className="block hover:underline truncate"
          >
            {breakingNews[currentIndex]?.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;