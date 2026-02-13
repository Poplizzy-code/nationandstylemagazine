import axios from "../api/axios";

export const articleAPI = {
  getAll: (params) => axios.get("/articles", { params }),
  getBySlug: (slug) => axios.get(`/articles/${slug}`),
  getFeatured: () => axios.get("/articles/featured"),
  getBreaking: () => axios.get("/articles/breaking"),
  getTopStories: () => axios.get("/articles/top-stories"),
  getByCategory: (categorySlug, limit, page) =>
    axios.get(`/articles/category/${categorySlug}`, {
      params: { limit, page },
    }),
};

export const categoryAPI = {
  getAll: () => axios.get("/categories"),
  getBySlug: (slug) => axios.get(`/categories/${slug}`),
};

export const authorAPI = {
  getAll: () => axios.get("/authors"),
  getBySlug: (slug) => axios.get(`/authors/${slug}`),
};

export const subscriberAPI = {
  subscribe: (email) => axios.post("/subscribers", { email }),
};

export const authAPI = {
  login: (credentials) => axios.post("/auth/login", credentials),
  register: (userData) => axios.post("/auth/register", userData),
  getProfile: () => axios.get("/auth/profile"),
};
