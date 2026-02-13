export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatReadTime = (minutes) => {
  return `${minutes} min read`;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  
  // For images, use the server URL without /api
  return `http://localhost:5000/${imagePath}`;
};

export const generateExcerpt = (content, length = 150) => {
  const stripped = content.replace(/<[^>]*>/g, '');
  return truncateText(stripped, length);
};