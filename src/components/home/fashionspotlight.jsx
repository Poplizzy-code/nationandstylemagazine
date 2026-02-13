import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articleAPI } from "../../services/api";
import { getImageUrl } from "../../utils/helpers";

const FashionSpotlight = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFashionArticles = async () => {
      try {
        const response = await articleAPI.getByCategory("fashion", 4);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching fashion articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFashionArticles();
  }, []);

  const spotlightLabels = ["TRENDS", "EDITORIAL", "RUNWAY", "ACCESSORIES"];

  if (loading) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-yellow-400 mb-2">
              CURATED COLLECTION
            </h2>
          </div>
          <h2 className="text-4xl font-serif font-bold text-white mb-2">
            Fashion Spotlight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 h-80 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-secondary text-sm font-semibold mb-2 uppercase">
              CURATED COLLECTION
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Fashion Spotlight
            </h2>
          </div>
          <Link
            to="/category/fashion"
            className="text-white hover:text-secondary transition-colors font-semibold hidden md:block">
            View All Fashion →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div key={article._id} className="group relative overflow-hidden">
              <Link to={`/article/${article.slug}`}>
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={getImageUrl(article.featuredImage)}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                  {/* Label */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-primary px-3 py-1 text-xs font-bold uppercase">
                      {spotlightLabels[index] || "FASHION"}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-serif font-bold line-clamp-2 group-hover:text-secondary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/category/fashion"
            className="text-white hover:text-secondary transition-colors font-semibold">
            View All Fashion →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FashionSpotlight;
