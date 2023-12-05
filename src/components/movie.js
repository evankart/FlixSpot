import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import AddReview from "./add-review";

const Movie = (props) => {
  let userId;
  props.user ? (userId = props.user.sub) : (userId = "");
  let reviewContent = "";
  const [review, setReview] = useState("");

  let { id } = useParams();
  const { isAuthenticated } = useAuth0();

  const [movie, setMovie] = useState({
    id: id,
    title: "",
    rated: "",
    reviews: [],
  });

  const [reviewId, setReviewId] = useState("");

  useEffect(() => {
    console.log("review: ", review);
  }, [review]);

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
  }, [id, movie]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, userId, id)
      .then(() => {
        const newArray = [
          ...movie.reviews.slice(0, index),
          ...movie.reviews.slice(index + 1),
        ];

        const newMovie = movie;
        newMovie.reviews = newArray;
        console.log("movie.reviews: ", movie.reviews[index]);
        setMovie(newMovie);
        console.log("newMovie", newMovie);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateReview = (reviewId, index, newReview) => {
    MovieDataService.updateReview(reviewId, userId, newReview)
      .then(() => {
        const newArray = [
          ...movie.reviews.slice(0, index),
          newReview,
          ...movie.reviews.slice(index + 1),
        ];

        const newMovie = movie;
        newMovie.reviews = newArray;
        setMovie(newMovie);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              <div
                id="addReviewWrapper"
                // className="hidden"
              >
                <AddReview
                  user={props.user}
                  reviewId={reviewId}
                  setReviewId={setReviewId}
                  reviewContent={reviewContent}
                  review={review}
                  setReview={setReview}
                />
              </div>
            </>
          )}
          <h1 className="font-bold my-2">Reviews:</h1>

          {movie.reviews.map((rev, index) => {
            return (
              <div className="mb-3">
                <h3 className="text-sm">
                  <strong>{`${rev.name} `}</strong>
                  {`reviewed on ${moment(rev.date).format("Do MMMM YYYY")}`}
                </h3>
                <p className="text-sm">{rev.review}</p>

                {isAuthenticated && rev.user_id === userId && (
                  <div className="h-4">
                    <button
                      className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
                      onClick={() => {
                        setReviewId(rev._id);
                        if (rev.user_id === userId) {
                          console.log("proceed");
                          updateReview(rev._id, index, review);
                        } else {
                          console.log("failed");
                          alert(
                            "Sorry, you can only edit or delete your own reviews"
                          );
                        }
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
                      onClick={() => {
                        if (rev.user_id === userId) {
                          deleteReview(rev._id, index);
                        } else {
                          console.log("failed");
                          alert(
                            "Sorry, you can only edit or delete your own reviews"
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
