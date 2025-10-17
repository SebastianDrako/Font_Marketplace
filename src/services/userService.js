import apiClient from './apiClient';

export const userService = {
  changePassword(passwords) {
    return apiClient.post('/api/v1/auth/change-password', passwords);
  },
};
