import api from '../api';
import {
  Authenticated,
  Authentication,
  AuthenticatedRefresh,
} from '../types';

export const AuthService = {
  async login(authentication: Authentication): Promise<Authenticated|null> {
    try {
      const { data } = await api.post<Authenticated>(
        '/user/login/',
        authentication
      );
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async refresh(authentication: AuthenticatedRefresh): Promise<string | null> {
    try {
      const { token } = authentication;
      const { data } = await api.post<AuthenticatedRefresh>('/user/login_refresh/', {
        token,
      });
      
      if (data) {
        return data.token;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error refreshing token:', error);
      return null;
    }
  },
};
