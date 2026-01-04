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

// Ensure no trailing slash issues
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // ❌ REMOVE THIS: You are using Header tokens, not Cookies
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  getMe: () => api.get("/auth/me"),
  createAdmin: (data) => api.post("/auth/create-admin", data),

  // Change Password (Private)
  changePasswordInit: (data) =>
    api.post("/auth/change-password/initiate", data),
  changePasswordConfirm: (data) =>
    api.put("/auth/change-password/confirm", data),

  // Forgot Password (Public)
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.put("/auth/reset-password", data),
};

// Portfolio API
export const portfolioAPI = {
  getAll: () => api.get("/portfolios"),
  getById: (id) => api.get(`/portfolios/${id}`),
  getBySlug: (slug) => axios.get(`${API_URL}/portfolios/public/${slug}`), // Public doesn't need interceptor
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