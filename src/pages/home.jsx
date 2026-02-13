import HeroSection from "../components/home/herosection";
import TopStories from "../components/home/topstories";
import FashionSpotlight from "../components/home/fashionspotlight";
import FeatureStories from "../components/home/featurestories";
import Featured from "../components/home/featured";
import AdBanner from "../components/common/adbanner";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <div className="my-14 px-4">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-3 py-1 rounded-bl-xl tracking-widest uppercase">
            Ad
          </div>

          <AdBanner position= "sidebar"/>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeatureStories />
          </div>
          <div>
            <TopStories />
          </div>
        </div>
      </div>

      <FashionSpotlight />

      <Featured />

      <div className="my-14 px-4">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-3 py-1 rounded-bl-xl tracking-widest uppercase">
            Ad
          </div>

          <AdBanner position= "header" />
        </div>
      </div>
    </div>
  );
};

export default Home;
