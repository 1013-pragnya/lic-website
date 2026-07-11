import axios from 'axios';

// Create a configured Axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.lic-advisor-admin.local/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Axios Request Interceptor for JWT injection
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios Response Interceptor for handling global authentication failures (e.g. 401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local session details on JWT expiry or invalidation
      localStorage.removeItem('admin_jwt_token');
      localStorage.removeItem('admin_session_active');
      window.location.href = '/admin/login?expired=true';
    }
    return Promise.reject(error);
  }
);

// --- MOCK API SERVICE FOR OFFLINE / JWT-READY DEVELOPMENT ---
// This mocks network latencies and responses, allowing seamless backend integration.
// To connect to a real backend, simply replace these mock calls with actual axiosClient requests.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  login: async (passcodeOrEmail, password) => {
    await delay(800); // Simulate network latency

    const storedEmail = localStorage.getItem('admin_email') || 'admin@rrfs.com';
    const storedPassword = localStorage.getItem('admin_password') || 'adminpassword';
    const storedPasscode = localStorage.getItem('admin_passcode') || '1234';

    // Validate using Email/Password or Passcode/Password override
    const matchesEmailAuth = (passcodeOrEmail && passcodeOrEmail.toLowerCase() === storedEmail.toLowerCase() && (password === storedPassword || password === 'admin' || password === '1234'));
    const matchesPasscodeAuth = (passcodeOrEmail === storedPasscode) || (password && (password.toLowerCase() === 'admin' || password === '1234'));

    if (matchesEmailAuth || matchesPasscodeAuth) {
      const payload = {
        sub: 'admin_user_01',
        name: 'Administrator',
        role: 'superadmin',
        email: storedEmail,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 hours expiration
      };
      
      // Simulate JWT structure (Header.Payload.Signature)
      const mockHeader = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const mockPayload = btoa(JSON.stringify(payload));
      const mockSignature = 'simulated_signature_hash_cfa844';
      const token = `${mockHeader}.${mockPayload}.${mockSignature}`;

      localStorage.setItem('admin_jwt_token', token);
      localStorage.setItem('admin_session_active', JSON.stringify(payload));

      return {
        success: true,
        token,
        user: payload
      };
    } else {
      throw new Error('Invalid credentials. Hint: Enter Passcode 1234 or Password "admin"');
    }
  },

  verifyToken: async () => {
    await delay(300);
    const token = localStorage.getItem('admin_jwt_token');
    if (!token) return { isValid: false };

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return { isValid: false };
      
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp < now) {
        localStorage.removeItem('admin_jwt_token');
        localStorage.removeItem('admin_session_active');
        return { isValid: false };
      }

      return { isValid: true, user: payload };
    } catch (e) {
      return { isValid: false };
    }
  },

  logout: async () => {
    await delay(300);
    localStorage.removeItem('admin_jwt_token');
    localStorage.removeItem('admin_session_active');
    return { success: true };
  }
};

export default axiosClient;
