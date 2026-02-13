import { Outlet } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import BreakingNews from '../common/breakingnews';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BreakingNews />
      <Header />
      <main className="flex-1 pt-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;