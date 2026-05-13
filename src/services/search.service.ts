import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5000',
});

export const searchTodos = async (query: string) => {
  const res = await API.post('/search', {
    query,
  });

  return res.data;
};