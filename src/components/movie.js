import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import Review from "./review";

const Movie = (props) => {
  let { id } = useParams();
  const isAuthenticated = useAuth0();

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

  const { user } = useAuth0();
  let userId;
  user ? (userId = user.sub) : (userId = "");

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
  }, [
    id,
    submitted,
    // movie
  ]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, userId, id)
      .then(() => {
        const newArray = [
          ...movie.reviews.slice(0, index),
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

  // console.log(`props: `, props);

  // let editing = false;
  // const [editing, setEditing] = useState(false);

  // let { id } = useParams();

  const onChangeReview = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
  };

  let data;
  const saveReview = () => {
    data = {
      // review: props.review,
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
          const val = true;
          setSubmitted(val);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (editing === true) {
      // console.log(`editing data: `, data);
      MovieDataService.updateReview(reviewId, data.user_id, data.review)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
      setEditing(false);
    } else {
      console.log("neither");
    }
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
                <div>
                  {submitted ? (
                    <div>
                      <h4>Review submitted successfully! </h4>
                    </div>
                  ) : (
                    <>
                      {/*
                       * on first load show add review box
                       * on clicking Submit, add review to list hide the text box and submit button, show success message
                       */}
                      <form>
                        <textarea
                          value={props.review}
                          placeholder="Add a review"
                          className="w-full"
                          onChange={onChangeReview}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveReview();
                            }
                          }}
                        />

                        <button
                          className="flex ml-auto font-bold"
                          onClick={(e) => {
                            e.preventDefault();
                            saveReview();
                          }}
                          type="submit"
                        >
                          {editing ? "Submit Edited Review" : "Submit Review"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          <h1 className="font-bold my-2">Reviews:</h1>

          {movie.reviews.map((rev, index) => {
            return (
              <div className="mb-3">
                <Review
                  rev={movie.reviews[index]}
                  index={index}
                  userId={userId}
                  deleteReview={deleteReview}
                  setReviewId={setReviewId}
                  updateReview={updateReview}
                  movie={movie}
                  getMovie={getMovie}
                  id={id}
                  setMovie={setMovie}
                  setEditing={setEditing}
                ></Review>
                {/* <h3 className="text-sm">
                  <strong>{`${rev.name} `}</strong>
                  {`reviewed on ${moment(rev.date).format("Do MMMM YYYY")}`}
                </h3>
                <p className="text-sm">{rev.review}</p>

                {isAuthenticated && rev.user_id === userId && (
                  <div className="h-4">
                    <button
                      className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
                      onClick={() => {
                        setEditing((editing) => !editing);
                        setReviewId(rev._id);
                        if (rev.user_id === userId) {
                          updateReview(rev._id, index, review);
                        } else {
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
                {editing && movie.reviews[index] == rev && (
                  <div>EDIT YOUR REVIEW IN THE BOX ABOVE</div>
                )}
              </div> */}
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
