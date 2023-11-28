import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import AddReview from "./add-review";

const Movie = (props) => {
  let userId;

  props.user ? (userId = props.user.sub) : (userId = "");

  let { id } = useParams();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [movie, setMovie] = useState({
    id: id,
    title: "",
    rated: "",
    reviews: [],
  });

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
  }, [id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, userId)
      .then(() => {
        setMovie(() => {
          movie.reviews.splice(index, 1);
          return { ...movie };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="my-5">
      <h1 className="text-center font-poppins font-bold text-2xl mb-3">
        {movie.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:w-3/4 sm:max-w-[1000px] mx-auto">
        <img
          className="w-[400px] mx-auto "
          src={movie.poster + "/100px180"}
          alt=""
        />

        <div className="mx-auto p-5">
          <p className="mb-3">{movie.plot}</p>
          {isAuthenticated && (
            <>
              {/* <button className="bg-teal px-2 rounded-xl h-6 font-bold text-sm mb-4">
              <Link to={"/movies/" + id + "/review"}>Add a Review</Link>
            </button> */}

              <button
                onClick={() => {
                  let wrapper = document.querySelector("#addReviewWrapper");
                  wrapper.classList.toggle("hidden");
                  setMovie(movie);
                }}
                className="bg-teal px-2 rounded-xl h-6 font-bold text-sm mb-4"
              >
                Add a Review
              </button>
              <div id="addReviewWrapper" className="hidden">
                <AddReview user={props.user} />
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
                  {index + 1}
                </h3>
                <p className="text-sm">{rev.review}</p>

                {isAuthenticated && rev.user_id === userId && (
                  <div className="h-4">
                    <button className="bg-teal px-2 text-xs h-full mr-1 rounded-xl font-bold">
                      <Link to={"/movies/" + id + "/review"}>Edit</Link>
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
