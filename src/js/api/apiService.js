import settings from "../../settings/apiVariables.js";

const { BASE_URL, API_KEY } = settings;

class ImagesApiService {
  costructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const { hits } = await data;
    this.increment();

    return hits;
  }

  increment() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export default ImagesApiService;
