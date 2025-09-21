const API_URL = 'https://bmi-calculator-backend-six.vercel.app/api';

// Token management
export const setToken = (token) => {
  localStorage.setItem('bmi_token', token);
};

export const getToken = () => {
  return localStorage.getItem('bmi_token');
};

export const removeToken = () => {
  localStorage.removeItem('bmi_token');
};

// API headers
const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token
  };
};

// User operations
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    if (data.token) {
      setToken(data.token);
      return { success: true, username: data.username };
    }
    throw new Error('No token received');
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// BMI History operations
export const getBmiHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/bmi/history`, {
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Error fetching BMI history:', error);
    return [];
  }
};

export const saveBmiHistory = async (entry) => {
  try {
    const response = await fetch(`${API_URL}/bmi`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(entry)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return true;
  } catch (error) {
    console.error('Error saving BMI entry:', error);
    return false;
  }
};