// @ts-ignore
import axios from 'axios';
import { AuthService } from '../services/auth';
import { setToken, logout } from '../redux/slices/authSlice'; // Importe a ação de login
import redux from '../redux/store'; // Importe a redux configurada do Redux

// @ts-ignore
const env = import.meta.env.VITE_ENVIRONMENT as 'production' | 'homologation' | 'development';

export const ENVIRONMENT = {
  production: {
    url: 'https://brain.agriculture.kevinsoares.com.br',
  },
  homologation: {
    url: 'https://brain.agriculture.kevinsoares.com.br',
  },
  development: {
    url: 'https://brain.agriculture.kevinsoares.com.br',
  },
};

const { url } = ENVIRONMENT[env];

let api = axios.create({
  baseURL: url + '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response && error.response.status === 401 && error.response.data.detail === 'O token expirou.') {
      try {
        const newToken = await AuthService.refresh({
          token: localStorage.getItem('token') || '',
        });
        if (newToken) {
          redux.dispatch(setToken({
            token: newToken,
          }));
          return Promise.reject('');
        } else {
          redux.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }else if (error.response && error.response.status === 401 && error.response.data.detail === 'Token inválido.') {
      redux.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;
