import apiClient from './apiClient';

export const addressService = {
  getAddresses() {
    return apiClient.get('/api/v1/addresses');
  },
  getAddressById(addressId) {
    return apiClient.get(`/api/v1/addresses/${addressId}`);
  },
  createAddress(addressData) {
    return apiClient.post('/api/v1/addresses', addressData);
  },
  updateAddress(addressId, addressData) {
    return apiClient.put(`/api/v1/addresses/${addressId}`, addressData);
  },
  deleteAddress(addressId) {
    return apiClient.delete(`/api/v1/addresses/${addressId}`);
  },
};
