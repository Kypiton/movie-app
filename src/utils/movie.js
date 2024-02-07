import httpService from './http.js';

class MovieService {
  constructor() {
    this.$http = httpService;
  }

  async auth() {
    try {
      const data = await this.$http.get('/authentication');
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPopular() {
    try {
      const data = await this.$http.get(
        '/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=airing_today.desc',
      );
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPopularById(id) {
    try {
      const data = await this.$http.get(`/tv/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilms() {
    try {
      const data = await this.$http.get(
        '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      );
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilmById(id) {
    try {
      const data = await this.$http.get(`/movie/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSerials() {
    try {
      const data = await this.$http.get(
        '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
      );
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSoon() {
    try {
      const data = await this.$http.get(
        '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=upcoming.desc',
      );
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSoonById(id) {
    try {
      const data = await this.$http.get(`/movie/${id}?language=en-US`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const movieService = new MovieService();
export default movieService;
