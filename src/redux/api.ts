import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brands-crud-app.onrender.com',
  withCredentials: true,
});
export default api;
