import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import AddReview from "./add-review";

const Review = ({
  rev,
  index,
  userId,
  deleteReview,
  setReviewId,
  updateReview,
  movie,
  getMovie,
  id,
  setMovie,
  setEditing,
  editing,
  submitted,
  saveReview,
  setReview,
}) => {
  const isAuthenticated = useAuth0();
  const [editingReview, setEditingReview] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    console.log("editingReview", editingReview);
  }, [editingReview]);

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
                editingReview={editingReview}
                setEditingReview={setEditingReview}
                buttonVal={"Update Review"}
                saveReview={saveReview}
                setReview={setReview}
                successMessage={"Review Updated Successfully!"}
                submitted={submitted}
                edited={edited}
              ></AddReview>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
