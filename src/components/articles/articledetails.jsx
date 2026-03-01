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
    <article className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Hero Section with Category Badge */}
          <div className="relative">
            {/* Featured Image */}
            <div className="w-full h-96 overflow-hidden">
              <img
                src={getImageUrl(article.featuredImage)}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Category Badge Overlay */}
            <Link
              to={`/category/${article.category?.slug}`}
              className="absolute top-6 left-6 bg-secondary text-primary px-4 py-2 text-sm font-bold hover:bg-secondary-light transition-colors uppercase shadow-lg">
              {article.category?.name}
            </Link>
          </div>

          {/* Article Content Container */}
          <div className="px-8 py-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center space-x-3">
                {article.author?.profileImage && (
                  <img
                    src={getImageUrl(article.author.profileImage)}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
                  />
                )}
                <div>
                  <p className="font-bold text-gray-900">
                    {article.author?.name}
                  </p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{formatDate(article.createdAt)}</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center font-medium">
                <FiClock className="mr-1" />
                {article.readTime} min read
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center font-medium">
                <FiEye className="mr-1" />
                {article.views} views
              </span>
            </div>

            {/* Excerpt */}
            <div className="text-xl text-gray-700 font-medium mb-10 italic border-l-4 border-secondary pl-6 bg-gray-50 py-4 rounded-r">
              {article.excerpt}
            </div>

            {/* Content - WITH GOLDEN DROP CAP */}
            <div
              className="article-content prose prose-lg prose-img:rounded-lg prose-img:shadow-md prose-headings:font-serif prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-secondary prose-a:no-underline hover:prose-a:underline max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-secondary hover:text-white transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t-2 border-b-2 border-gray-200 py-8 mb-12">
              <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                Share this article:
              </p>
              <div className="flex space-x-4">
                
                 <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all shadow-md">
                  <FiFacebook size={20} />
                </a>
                
                 <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:scale-110 transition-all shadow-md">
                  <FiTwitter size={20} />
                </a>
                
                 <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full hover:bg-blue-900 hover:scale-110 transition-all shadow-md">
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Author Bio */}
            {article.author?.bio && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl mb-12 border-l-4 border-secondary">
                <div className="flex items-start space-x-6">
                  {article.author.profileImage && (
                    <img
                      src={getImageUrl(article.author.profileImage)}
                      alt={article.author.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">
                      About {article.author.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{article.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-gray-900">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <article
                  key={related._id}
                  className="bg-white group card-hover rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Link to={`/article/${related.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={getImageUrl(related.featuredImage)}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link
                      to={`/category/${related.category?.slug}`}
                      className="inline-block text-xs font-bold text-secondary uppercase mb-2 hover:underline">
                      {related.category?.name}
                    </Link>
                    <h3 className="text-lg font-serif font-bold line-clamp-2 mb-3">
                      <Link
                        to={`/article/${related.slug}`}
                        className="hover:text-secondary transition-colors">
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
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