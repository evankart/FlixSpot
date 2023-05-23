import axios from "axios";

// const base = "http://localhost:5000";
const base = "https://flowermap-backend.onrender.com";

class FlowerDataService {
  getAll(page = 0) {
    return axios.get(`${base}/api/v1/flowers?page=${page}`);
    // return axios.get(`https://flowermap-backend.onrender.com/api/v1/flowers?page=${page}`);
  }
  get(id) {
    return axios.get(`${base}/api/v1/flowers/id/${id}`);
  }
  find(query, by = "title", page = 0) {
    return axios.get(`${base}/api/v1/flowers?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return axios.post(`${base}/api/v1/flowers/review`, data);
  }
  updateReview(data) {
    return axios.put(`${base}/api/v1/flowers/review`, data);
  }
  deleteReview(id, userId) {
    return axios.delete(`${base}/api/v1/flowers/review`, {
      data: { review_id: id, user_id: userId },
    });
  }
  getRatings() {
    return axios.get(`${base}/api/v1/flowers/ratings`);
  }
}

export default new FlowerDataService();
