import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import { getImageUrl } from '../../utils/helpers';
import { FiArrowRight } from 'react-icons/fi';

const Featured = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const response = await articleAPI.getAll({ limit: 3, page: 2 });
        setArticles(response.data.data);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-serif font-bold mb-8">Feature Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-[500px]"></div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="animate-pulse bg-gray-200 h-60"></div>
              <div className="animate-pulse bg-gray-200 h-60"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [leftArticle, ...rightArticles] = articles;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Feature Stories</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Left Article */}
          {leftArticle && (
            <article className="group h-full">
              <Link to={`/article/${leftArticle.slug}`} className="block h-full">
                <div className="relative h-[500px] overflow-hidden">
                  <img
                    src={getImageUrl(leftArticle.featuredImage)}
                    alt={leftArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-secondary text-primary px-4 py-1 text-sm font-bold uppercase">
                      {leftArticle.category?.name}
                    </span>
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-3 line-clamp-3 group-hover:text-secondary transition-colors">
                      {leftArticle.title}
                    </h3>
                    <p className="text-gray-200 text-base line-clamp-2 mb-4">
                      {leftArticle.excerpt}
                    </p>
                    <div className="text-sm text-gray-300">
                      {leftArticle.readTime} min read
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Right Side - Two Stacked Articles */}
          <div className="grid grid-cols-1 gap-8">
            {rightArticles.map((article) => (
              <article key={article._id} className="group">
                <Link to={`/article/${article.slug}`} className="block">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={getImageUrl(article.featuredImage)}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-primary px-3 py-1 text-xs font-bold uppercase">
                        {article.category?.name}
                      </span>
                    </div>

                    {/* Content at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-300">
                        {article.readTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* View More Stories Link */}
        <div className="mt-12 text-center">
          <Link 
            to="/category/features" 
            className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-semibold text-lg group transition-colors"
          >
            <span>View More Stories</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;