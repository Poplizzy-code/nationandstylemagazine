import ArticleCard from './articlecard';

const ArticleGrid = ({ articles, variant = 'default' }) => {
  if (variant === 'list') {
    return (
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} variant="horizontal" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;