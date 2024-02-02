import axios from 'axios';

class HttpService {
  constructor() {
    this._axios = axios.create({
      baseURL: `https://api.themoviedb.org/3`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });

    this._axios.interceptors.request.use(config => {
      return config;
    });

    this._axios.interceptors.response.use(
      response => {
        return response.status === 200 ? response.data : response;
      },
      async error => {
        return Promise.reject(error);
      },
    );
  }

  async get(url, config) {
    return await this._axios.get(url, config);
  }

  async post(url, data, config) {
    return await this._axios.post(url, data, config);
  }
}

const httpService = new HttpService();
export default httpService;
