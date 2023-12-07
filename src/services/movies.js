import axios from "axios";

const base = "https://flixspot-backend.vercel.app/api/v1/movies";
// const base = "http://localhost:5000/api/v1/movies";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${base}?page=${page}`);
  }
  get(id) {
    return axios.get(`${base}/${id}`);
  }

  find(title, rated) {
    let page = 0;
    console.log("get URL: ", `${base}?title=${title}&page=${page}`);
    return axios.get(`${base}?$rated=${rated}&title=${title}&page=${page}`);
  }

  createReview(data) {
    // console.log(`CREATE REVIEW POST SERVICE`);
    // console.log(`(POST) data: `, data);
    return axios.post(`${base}/review`, data);
  }
  updateReview(review_id, user_id, review) {
    // console.log(`UPDATE REVIEW PUT SERVICE`);
    // console.log(`(PUT) review_id: ${review_id}`);
    // console.log(`(PUT) userId: ${user_id}`);
    // console.log(`(PUT) review: ${review}`);
    // console.log(`(PUT) request URL: ${base}/${review_id}`);

    return axios
      .put(`${base}/${review_id}`, {
        data: {
          review_id: review_id,
          user_id: user_id,
          review: review,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        // Log the response to the client console
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        // Log the error to the client console
      });
  }
  deleteReview(review_id, user_id) {
    return axios.delete(`${base}/review`, {
      data: { review_id: review_id, user_id: user_id },
    });
  }
  getRatings() {
    return axios.get(`${base}/ratings`);
  }
}

export default new MovieDataService();
