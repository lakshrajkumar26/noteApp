import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_BASE_URL = `${API_BASE}/api/auth`;
const NOTES_BASE_URL = `${API_BASE}/api/notes`;

const authApi = {
  register: async (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
  },

  verifyOtp: async (email, otp) => {
    return axios.post(`${API_BASE_URL}/verify-otp`, { email, otp }, { withCredentials: true });
  },

  resendOtp: async (email) => {
    return axios.post(`${API_BASE_URL}/resend-otp`, { email }, { withCredentials: true });
  },

  login: async (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password }, {
      withCredentials: true
    });
  },

  logout: async () => {
    return axios.post(`${API_BASE_URL}/logout`, {}, {
      withCredentials: true
    });
  },

  dashboard: async () => {
    return axios.post(`${API_BASE_URL}/dashboard2`, {}, {
      withCredentials: true
    });
  }
};

const notesApi = {
  createNote: async (noteData) => {
    return axios.post(`${NOTES_BASE_URL}/create`, noteData, {
      withCredentials: true
    });
  },

  getUserNotes: async (email) => {
    if (email) {
      return axios.get(`${NOTES_BASE_URL}/all?email=${encodeURIComponent(email)}`, {
        withCredentials: true
      });
    }
    return axios.get(`${NOTES_BASE_URL}/all`, {
      withCredentials: true
    });
  },

  deleteNote: async (noteId, email) => {
    if (email) {
      return axios.delete(`${NOTES_BASE_URL}/delete/${noteId}`, {
        data: { email },
        withCredentials: true
      });
    }
    return axios.delete(`${NOTES_BASE_URL}/delete/${noteId}`, {
      withCredentials: true
    });
  }
};

export { authApi, notesApi };
export default authApi; 