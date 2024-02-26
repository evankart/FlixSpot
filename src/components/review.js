import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDataService from "../services/movies";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import EditReview from "./edit-review";

const Review = ({
  index,
  rev,
  userId,
  setReviewId,
  movie,
  getMovie,
  setMovie,
  setEditing,
  saveReview,
  setReview,
  edited,
}) => {
  const { id } = useParams();
  const isAuthenticated = useAuth0();

  const [editingReview, setEditingReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    getMovie(id);
  };

  return (
    <>
      {isOpen && (
        <div>
          <div className="w-full h-full max-h-screen overflow-scroll bg-black absolute top-0 left-0 opacity-50 backdrop-filter backdrop-blur-3xl"></div>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center z-50 w-10/12 self-center mx-auto"
          >
            <div
              onClick={() => setIsOpen(false)}
              className="bg-white rounded-3xl shadow-3xl bg-gradient-to-tl from-slate-200 to-white p-8"
            >
              <h2 className="text-2xl mb-4">
                <strong>{`${rev.author} `}</strong>
                {`reviewed on ${moment(rev.date).format("Do MMMM YYYY")}`}
              </h2>
              <p className="mb-4">{rev.content}</p>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => setIsOpen(false)}
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <div>
          <h3 className="text-md mt-4 mb-1">
            <strong>{`${rev.author} `}</strong>
            {`reviewed on ${moment(rev.date).format("Do MMMM YYYY")}`}
          </h3>

          <p className="text-sm italic">
            {rev.content.substring(0, 300).trim() + "... "}
            <button
              className="italic font-semibold text-xs"
              onClick={() => setIsOpen(true)}
            >
              (see more)
            </button>
          </p>

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
              <EditReview
                edited={edited}
                setReview={setReview}
                saveReview={saveReview}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
