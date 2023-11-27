import axios from "axios";

// const base = "http://localhost:5000/api/vi/flowers";
// const base = "https://flowermap-backend.onrender.com";
// const base = "https://flowermap-backend.onrender.com/api/v1/flowers";
const base = "https://flixspot-backend.vercel.app/api/v1/flowers";

class FlowerDataService {
  getAll(page = 0) {
    return axios.get(`${base}?page=${page}`);
    // return axios.get(`https://flowermap-backend.onrender.com?page=${page}`);
  }
  get(id) {
    return axios.get(`${base}/id/${id}`);
  }
  find(query, by = "title", page = 0) {
    return axios.get(`${base}?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return axios.post(`${base}/review`, data);
  }
  updateReview(data) {
    return axios.put(`${base}/review`, data);
  }
  deleteReview(id, userId) {
    return axios.delete(`${base}/review`, {
      data: { review_id: id, user_id: userId },
    });
  }
  getRatings() {
    return axios.get(`${base}/ratings`);
  }
}

export default new FlowerDataService();
