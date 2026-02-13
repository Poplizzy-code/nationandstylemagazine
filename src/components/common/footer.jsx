import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import Newsletter from './newsletter';

const Footer = () => {
  const sections = [
    {
      title: 'SECTIONS',
      links: [
        { name: 'News', path: '/category/news' },
        { name: 'Fashion', path: '/category/fashion' },
        { name: 'Culture', path: '/category/culture' },
        { name: 'Lifestyle', path: '/category/lifestyle' },
        { name: 'Features', path: '/category/features' },
        { name: 'Entertainment', path: '/category/entertainment' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Advertise', path: '/advertise' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <Newsletter />

      {/* Main Footer */}
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              NATION <span className="text-yellow-400">&</span> STYLE
            </h2>
            <p className="text-gray-300 mb-6">
              The premier destination for fashion, culture, and modern living. We deliver the stories that matter to the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg text-yellow-400 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto py-6">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Nation and Style Magazine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;