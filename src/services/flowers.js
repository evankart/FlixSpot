import axios from "axios";

class FlowerDataService {
  getAll(page = 0) {
    return axios.get(`http://localhost:5000/api/v1/flowers?page=${page}`);
  }
  get(id) {
    return axios.get(`http://localhost:5000/api/v1/flowers/id/${id}`);
  }
  find(query, by = "title", page = 0) {
    return axios.get(
      `http://localhost:5000/api/v1/flowers?${by}=${query}&page=${page}`
    );
  }
  createReview(data) {
    return axios.post("http://localhost:5000/api/v1/flowers/review", data);
  }
  updateReview(data) {
    return axios.put("http://localhost:5000/api/v1/flowers/review", data);
  }
  deleteReview(id, userId) {
    return axios.delete("http://localhost:5000/api/v1/flowers/review", {
      data: { review_id: id, user_id: userId },
    });
  }
  getRatings() {
    return axios.get("http://localhost:5000/api/v1/flowers/ratings");
  }
}

export default new FlowerDataService();
