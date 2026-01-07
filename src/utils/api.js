// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  // Check if API URL is localhost in production (won't work)
  if (API_BASE_URL.includes('localhost') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    throw new Error('Backend API not configured. Please set VITE_API_URL environment variable in Vercel.');
  }

  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Don't log connection errors in production to avoid console spam
    if (error.message && !error.message.includes('Backend API not configured')) {
      console.error('API request error:', error.message);
    }
    throw error;
  }
};

// API methods
export const api = {
  // Authentication
  login: async (username, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  verifyToken: async () => {
    return apiRequest('/auth/verify');
  },

  // Inventory
  getInventory: async () => {
    return apiRequest('/inventory');
  },

  createItem: async (itemData) => {
    return apiRequest('/inventory', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  updateItem: async (id, itemData) => {
    return apiRequest(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  deleteItem: async (id) => {
    return apiRequest(`/inventory/${id}`, {
      method: 'DELETE',
    });
  },

  stockInOut: async (id, type, quantity, note, reference) => {
    return apiRequest(`/inventory/${id}/stock`, {
      method: 'POST',
      body: JSON.stringify({ type, quantity, note, reference }),
    });
  },

  // Activities
  getActivities: async () => {
    return apiRequest('/activities');
  },

  // Products (for website)
  getProducts: async () => {
    return apiRequest('/products');
  },

  getProduct: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  // Products (admin)
  createProduct: async (productData) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id, productData) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
