import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Review from "./review";
import AddReview from "./add-review";

const Movie = (props) => {
  // User authentication
  const isAuthenticated = useAuth0();
  const { id } = useParams();
  const { user } = useAuth0();
  let userId;
  user ? (userId = user.sub) : (userId = "");

  // Init state variables
  const [review, setReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [movie, setMovie] = useState({
    id: id,
    title: "",
    rated: "",
    reviews: [],
  });

  useEffect(() => {
    console.log("review: ", review);
  }, [review]);

  useEffect(() => {
    console.log("reviewId: ", reviewId);
  }, [reviewId]);

  useEffect(() => {
    console.log("editing: ", editing);
  }, [editing]);

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id, submitted]);

  let data;
  function saveReview() {
    data = {
      review: review,
      review_id: props.review_id,
      name: props.user.name,
      user_id: props.user.sub,
      movie_id: id,
    };

    console.log("saveReview data: ", data);

    if (editing === false) {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (editing === true) {
      MovieDataService.updateReview(reviewId, data.user_id, data.review)
        .then((response) => {
          // console.log(response);
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
      setEditing(false);
    }
  }

  return (
    <div className="my-5 sm:w-7/8 lg:w-3/5 mx-auto h-[80vh]">
      <h1 className="text-center font-poppins font-bold text-xl sm:text-2xl mb-3">
        {movie.title}
      </h1>

      <div className="flex flex-col sm:flex-row ">
        <img
          className="w-[70%] w-max-[400px] mx-auto sm:w-2/5"
          src={movie.poster + "/100px180"}
          alt=""
        />

        <div className="w-full mx-auto p-5 sm:w-3/5">
          <p className="mb-3">{movie.plot}</p>
          {isAuthenticated && (
            <>
              <div id="addReviewWrapper">
                <AddReview
                  buttonVal={"Submit Review"}
                  successMessage={"Review Submitted Successfully!"}
                  saveReview={saveReview}
                  setReview={setReview}
                  submitted={submitted}
                ></AddReview>
              </div>
            </>
          )}
          <h1 className="font-bold my-2">Reviews:</h1>

          {movie.reviews.map((rev, index) => {
            return (
              <div className="mb-3">
                <Review
                  index={index}
                  rev={rev}
                  userId={userId}
                  setReviewId={setReviewId}
                  movie={movie}
                  getMovie={getMovie}
                  id={id}
                  setMovie={setMovie}
                  setEditing={setEditing}
                  editing={editing}
                  saveReview={saveReview}
                  submitted={submitted}
                  setReview={setReview}
                ></Review>
              </div>
            );
          })}
          {!isAuthenticated && (
            <div>Please log in to edit and delete reviews</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
