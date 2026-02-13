import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const AdBanner = ({ position = 'sidebar' }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/ads?position=${position}&isActive=true`);
        if (response.data.success && response.data.data.length > 0) {
          setAd(response.data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      }
    };
    fetchAd();
  }, [position]);

  if (!ad) return null;

  return (
    <div className="ad-banner mb-6">
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        <img 
          src={`http://localhost:5000/${ad.imageUrl}`}
          alt={ad.title}
          className="w-full rounded-lg shadow-md hover:shadow-lg transition"
        />
      </a>
    </div>
  );
};

export default AdBanner;