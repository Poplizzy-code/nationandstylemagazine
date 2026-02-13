import { Link } from 'react-router-dom';
import { getImageUrl, formatDate } from '../../utils/helpers';

const ArticleCard = ({ article, variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <article className="flex space-x-4 group">
        <Link to={`/article/${article.slug}`} className="flex-shrink-0">
          <img
            src={getImageUrl(article.featuredImage)}
            alt={article.title}
            className="w-32 h-32 object-cover group-hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="flex-1">
          <Link
            to={`/category/${article.category?.slug}`}
            className="text-xs font-bold text-secondary hover:text-secondary-dark uppercase"
          >
            {article.category?.name}
          </Link>
          <h3 className="text-lg font-serif font-bold mt-2 line-clamp-2">
            <Link
              to={`/article/${article.slug}`}
              className="hover:text-secondary transition-colors"
            >
              {article.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="text-xs text-gray-500 mt-2">
            {formatDate(article.createdAt)} • {article.readTime} min read
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white group card-hover">
      <Link to={`/article/${article.slug}`}>
        <div className="relative h-56 overflow-hidden">
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
          className="inline-block text-xs font-bold text-secondary hover:text-secondary-dark mb-3 uppercase"
        >
          {article.category?.name}
        </Link>

        <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2">
          <Link
            to={`/article/${article.slug}`}
            className="hover:text-secondary transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatDate(article.createdAt)}</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;