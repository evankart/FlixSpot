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
  const { isAuthenticated } = useAuth0();

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
  }, [id, movie]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, userId)
      .then(() => {
        const newArray = [
          ...movie.reviews.slice(0, index),
          ...movie.reviews.slice(index + 1),
        ];

        const newMovie = movie;
        newMovie.reviews = newArray;
        console.log("movie.reviews: ", movie.reviews);
        setMovie(newMovie);
        console.log("movie.reviews: ", movie.reviews);
        console.log("movie poster: ", movie.poster);
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
                </h3>
                <p className="text-sm">{rev.review}</p>

                {isAuthenticated && rev.user_id === userId && (
                  <div className="h-4">
                    <button className="bg-teal px-2 text-xs h-full mr-1 rounded-xl font-bold">
                      <Link to={`/movies/${id}/review`}>Edit</Link>
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
