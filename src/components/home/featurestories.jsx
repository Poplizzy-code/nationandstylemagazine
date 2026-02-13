import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articleAPI } from "../../services/api";
import { getImageUrl } from "../../utils/helpers";

const FeatureStories = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleAPI.getAll({ limit: 3, page: 1 });
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching feature stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8">Cover Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="mb-8">
        <div className="container bg-blue-900 text-white px-6 py-2 inline-block">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">COVER</h2>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold">STORIES</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article._id} className="bg-white group card-hover">
              <Link to={`/article/${article.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageUrl(article.featuredImage)}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-6">
                <Link
                  to={`/category/${article.category?.slug}`}
                  className="inline-block text-xs font-bold text-secondary hover:text-secondary-dark mb-3 uppercase">
                  {article.category?.name}
                </Link>

                <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2">
                  <Link
                    to={`/article/${article.slug}`}
                    className="hover:text-secondary transition-colors">
                    {article.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                <div className="text-xs text-gray-500">
                  {article.readTime} min read
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStories;
