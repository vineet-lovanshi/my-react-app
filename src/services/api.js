// src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const createDPR = (dprData) => API.post('/dpr/create', dprData);
export const fetchAllDPR = () => API.get('/dpr/all');
