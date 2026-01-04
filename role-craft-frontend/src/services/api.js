// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post("/auth/login", credentials),
//   getMe: () => api.get("/auth/me"),
//   createAdmin: (data) => api.post("/auth/create-admin", data),
//   // Inside authAPI object
//   changePasswordInit: (data) =>
//     api.post("/auth/change-password/initiate", data),
//   changePasswordConfirm: (data) =>
//     api.put("/auth/change-password/confirm", data),
//   // ✅ Forgot Password APIs// ✅ New: Forgot Password (Public)
//   forgotPassword: (data) => api.post("/auth/forgot-password", data),
//   resetPassword: (data) => api.put("/auth/reset-password", data),
// };

// // Portfolio API
// export const portfolioAPI = {
//   getAll: () => api.get("/portfolios"),
//   getById: (id) => api.get(`/portfolios/${id}`),
//   getBySlug: (slug) => axios.get(`${API_URL}/portfolios/public/${slug}`),
//   create: (data) => api.post("/portfolios", data),
//   update: (id, data) => api.put(`/portfolios/${id}`, data),
//   delete: (id) => api.delete(`/portfolios/${id}`),
//   toggle: (id) => api.patch(`/portfolios/${id}/toggle`),
// };

// // Upload API
// export const uploadAPI = {
//   uploadResume: (portfolioId, file) => {
//     const formData = new FormData();
//     formData.append("resume", file);
//     return api.post(`/upload/resume/${portfolioId}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   uploadImage: (portfolioId, file) => {
//     const formData = new FormData();
//     formData.append("image", file);
//     return api.post(`/upload/image/${portfolioId}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
// };

// export default api;



import axios from "axios";

// Clean the API URL to ensure no double slashes
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // ❌ REMOVED: withCredentials: true (Not needed for Bearer tokens)
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // 1. Get token freshly from storage
    const token = localStorage.getItem("token");

    // 2. Attach to header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 (Token Expired) globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token is invalid, clear it so user knows to login again
      localStorage.removeItem("token");
      // Optional: window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  getMe: () => api.get("/auth/me"),
  createAdmin: (data) => api.post("/auth/create-admin", data),
  changePasswordInit: (data) =>
    api.post("/auth/change-password/initiate", data),
  changePasswordConfirm: (data) =>
    api.put("/auth/change-password/confirm", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.put("/auth/reset-password", data),
};

// Portfolio API
export const portfolioAPI = {
  getAll: () => api.get("/portfolios"),
  getById: (id) => api.get(`/portfolios/${id}`),
  getBySlug: (slug) => axios.get(`${API_URL}/portfolios/public/${slug}`),
  create: (data) => api.post("/portfolios", data),
  update: (id, data) => api.put(`/portfolios/${id}`, data),
  delete: (id) => api.delete(`/portfolios/${id}`),
  toggle: (id) => api.patch(`/portfolios/${id}/toggle`),
};

// Upload API
export const uploadAPI = {
  uploadResume: (portfolioId, file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return api.post(`/upload/resume/${portfolioId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  uploadImage: (portfolioId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post(`/upload/image/${portfolioId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;