import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Review from "./review";
import AddReview from "./add-review";

const Movie = (props) => {
  // User authentication
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { id } = useParams();
  const { user } = useAuth0();
  let userId;
  user ? (userId = user.sub) : (userId = "");

  // Init state variables
  const [review, setReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [reviews, setReviews] = useState();

  const [movie, setMovie] = useState({
    id: id,
    title: "",
    rated: "",
    reviews: [],
  });

  // useEffect(() => {
  //   console.log("review: ", review);
  // }, [review]);

  // useEffect(() => {
  //   console.log("reviewId: ", reviewId);
  // }, [reviewId]);

  // useEffect(() => {
  //   console.log("editing: ", editing);
  // }, [editing]);

  // const getMovie = (id) => {
  //   MovieDataService.get(id)
  //     .then((response) => {
  //       setMovie(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmE1N2RkYjU4NDVjODY1OWFmY2FlMjhhMDhiMjJmNiIsInN1YiI6IjY1Y2E5N2MzMTI5NzBjMDE3YmM1NWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJn5j2iz8sMUouM62xtJo5d4bstYzgmdp8HFVJD6Wio",
    },
  };

  const getMovie = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        setMovie(json);
        console.log("movie details: ", json);
      })
      .catch((err) => console.error(err));
  };

  const getReviews = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, options)
      .then((response) => response.json())
      .then((json) => {
        setReviews(json.results);
        console.log("reviews: ", json);
      })
      .catch((err) => console.error(err));
  };

  // Refresh the movie when movie id is updated or review is submitted
  useEffect(() => {
    getMovie(id);
    getReviews(id);
  }, [id, submitted, edited]);

  let data;
  function saveReview() {
    data = {
      review: review,
      review_id: props.review_id,
      name: props.user.name,
      user_id: props.user.sub,
      movie_id: id,
    };

    // if not editing, create a new review. If editing, update existing review
    !editing
      ? MovieDataService.createReview(data)
          .then((response) => {
            setSubmitted(true);
          })
          .catch((e) => {
            console.log(e);
          })
      : MovieDataService.updateReview(reviewId, data.user_id, data.review)
          .then((response) => {
            setEdited(true);
          })
          .catch((e) => {
            console.log(e);
          });
    setEditing(false);
  }

  return (
    <div className="my-5 sm:w-7/8 lg:w-10/12 mx-auto h-[80vh]">
      <h1 className="text-center font-poppins font-bold text-xl sm:text-2xl mb-5">
        {movie.title}
      </h1>

      <div className="flex flex-col sm:flex-row ">
        <img
          className="max-w-[400px] max-h-[600px] aspect-[2/3] object-cover sm:w-2/5"
          src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />

        <div className="w-full mx-auto px-5 sm:w-3/5">
          <p className="mb-3">{movie.overview}</p>
          {isAuthenticated && user && (
            <>
              <div id="addReviewWrapper">
                <AddReview
                  saveReview={saveReview}
                  setReview={setReview}
                  submitted={submitted}
                ></AddReview>
              </div>
            </>
          )}
          <h1 className="font-bold my-2">Reviews:</h1>

          {reviews &&
            reviews.map((rev, index) => {
              {
                /* console.log("rev: ", rev); */
              }
              return (
                <div className="mb-3">
                  <Review
                    index={index}
                    rev={rev}
                    userId={userId}
                    setReviewId={setReviewId}
                    movie={movie}
                    getMovie={getMovie}
                    setMovie={setMovie}
                    setEditing={setEditing}
                    saveReview={saveReview}
                    setReview={setReview}
                    edited={edited}
                  ></Review>
                </div>
              );
            })}
          {!user && (
            <div>
              Please{" "}
              <button className="font-bold" onClick={loginWithRedirect}>
                log in
              </button>{" "}
              to add reviews.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
