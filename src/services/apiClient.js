

const API_BASE_URL = 'https://23.95.3.178:8443';

const apiClient = {
  async request(method, url, data = null, config = {}) {
    const fullUrl = `${API_BASE_URL}${url}`;

    const headers = {
      ...config.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const fetchOptions = {
      method,
      headers,
      ...config,
    };

    if (data) {
      if (data.constructor === Object) {
        headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(data);
      } else {
        fetchOptions.body = data;
      }
    }

    try {
      const response = await fetch(fullUrl, fetchOptions);

      const responseData = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: null,
      };

      if (config.responseType === 'blob') {
        responseData.data = await response.blob();
      } else {
        const text = await response.text();
        try {
          responseData.data = JSON.parse(text);
        } catch (e) {
          responseData.data = text;
        }
      }

      if (!response.ok) {
        const error = new Error(responseData.data?.message || response.statusText);
        error.response = responseData;
        throw error;
      }

      return responseData;

    } catch (error) {
      console.error('API Client Error:', error);
      throw error;
    }
  },

  get(url, config = {}) {
    return this.request('GET', url, null, config);
  },

  post(url, data, config = {}) {
    return this.request('POST', url, data, config);
  },

  put(url, data, config = {}) {
    return this.request('PUT', url, data, config);
  },
  
  patch(url, data, config = {}) {
    return this.request('PATCH', url, data, config);
  },

  delete(url, config = {}) {
    return this.request('DELETE', url, null, config);
  },
};

export default apiClient;