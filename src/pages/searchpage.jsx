import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { articleAPI } from '../services/api';
import ArticleGrid from '../components/articles/articlegrid';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await articleAPI.getAll({ search: query, limit: 20 });
        setArticles(response.data.data);
      } catch (error) {
        console.error('Error searching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
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
      <h1 className="text-4xl font-serif font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        Found {articles.length} results for "{query}"
      </p>

      {articles.length > 0 ? (
        <ArticleGrid articles={articles} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">No articles found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;