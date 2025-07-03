
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

export const login = async (identifier, password) => {
  const { data } = await axios.post(`${API_URL}/auth/local`, {
    identifier,
    password,
  });
  return data;
};

export const register = async (username, email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email,
    password,
  });
  return data;
};
