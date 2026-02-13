import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';
import ArticlePage from './pages/articlepage';
import CategoryPage from './pages/categorypage';
import SearchPage from './pages/searchpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;