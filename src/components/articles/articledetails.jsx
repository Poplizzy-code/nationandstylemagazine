import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { articleAPI } from "../../services/api";
import { getImageUrl, formatDate } from "../../utils/helpers";
import {
  FiClock,
  FiEye,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await articleAPI.getBySlug(slug);
        setArticle(response.data.data);

        // Fetch related articles from same category
        if (response.data.data.category?.slug) {
          const relatedResponse = await articleAPI.getByCategory(
            response.data.data.category.slug,
            3,
          );
          setRelatedArticles(
            relatedResponse.data.data.filter(
              (a) => a._id !== response.data.data._id,
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">
          Article Not Found
        </h2>
        <Link to="/" className="text-secondary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <article className="py-12">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <Link
            to={`/category/${article.category?.slug}`}
            className="inline-block bg-secondary text-primary px-4 py-1 text-sm font-bold mb-4 hover:bg-secondary-light transition-colors uppercase">
            {article.category?.name}
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              {article.author?.profileImage && (
                <img
                  src={getImageUrl(article.author.profileImage)}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {article.author?.name}
                </p>
              </div>
            </div>
            <span className="text-gray-400">•</span>
            <span>{formatDate(article.createdAt)}</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center">
              <FiClock className="mr-1" />
              {article.readTime} min read
            </span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center">
              <FiEye className="mr-1" />
              {article.views} views
            </span>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={getImageUrl(article.featuredImage)}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Excerpt */}
          <div className="text-xl text-gray-700 font-medium mb-8 italic border-l-4 border-secondary pl-6">
            {article.excerpt}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-img:rounded-lg prose-img:shadow-md prose-headings:font-serif prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="border-t border-b border-gray-200 py-6 mb-12">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Share this article:
            </p>
            <div className="flex space-x-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <FiFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                <FiTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Author Bio */}
          {article.author?.bio && (
            <div className="bg-gray-50 p-6 rounded-lg mb-12">
              <div className="flex items-start space-x-4">
                {article.author.profileImage && (
                  <img
                    src={getImageUrl(article.author.profileImage)}
                    alt={article.author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-bold mb-2">
                    About {article.author.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{article.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-serif font-bold mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <article
                  key={related._id}
                  className="bg-white group card-hover">
                  <Link to={`/article/${related.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(related.featuredImage)}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-serif font-bold line-clamp-2">
                      <Link
                        to={`/article/${related.slug}`}
                        className="hover:text-secondary transition-colors">
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleDetail;
