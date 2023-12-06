import { useState } from "react";
import MovieDataService from "../services/movies";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import AddReview from "./add-review";

const Review = ({
  rev,
  index,
  userId,
  setReviewId,
  movie,
  getMovie,
  id,
  setMovie,
  setEditing,
  submitted,
  saveReview,
  setReview,
  editing,
}) => {
  const isAuthenticated = useAuth0();
  const [editingReview, setEditingReview] = useState(false);

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

  return (
    <>
      <div>
        <div>
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
                  setEditingReview((editingReview) => !editingReview);
                  setEditing((editing) => !editing);
                  setReviewId(rev._id);
                }}
              >
                Edit
              </button>

              <button
                className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
                onClick={() => {
                  if (rev.user_id === userId) {
                    deleteReview(rev._id, index);
                    getMovie(id);
                  } else {
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

          {editingReview && movie.reviews[index] === rev && (
            <div className="mt-3">
              <AddReview
                buttonText={"Update Review"}
                successMessage={"Review Updated Successfully!"}
                saveReview={saveReview}
                setReview={setReview}
                submitted={submitted}
                editing={editing}
              ></AddReview>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
