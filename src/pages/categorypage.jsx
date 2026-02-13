import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articleAPI } from '../services/api';
import ArticleGrid from '../components/articles/articlegrid';
import TopStories from '../components/home/topstories';

const CategoryPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await articleAPI.getByCategory(slug, 12, page);
        setArticles(response.data.data);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    window.scrollTo(0, 0);
  }, [slug, page]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="bg-gray-200 h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-serif font-bold mb-8 capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>

          {articles.length > 0 ? (
            <>
              <ArticleGrid articles={articles} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">No articles found in this category.</p>
            </div>
          )}
        </div>

        <div>
          <TopStories />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;