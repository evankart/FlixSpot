import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";

const Review = (props) => {
  const isAuthenticated = useAuth0();
  const rev = props.rev;
  // console.log("passed rev: ", rev);
  // rev.userId = props.rev.userId;
  // rev.name = props.rev.name;
  // rev.date = props.rev.date;
  const index = props.index;
  const userId = props.userId;
  // const deleteReview = props.deleteReview;
  const setReviewId = props.setReviewId;
  const updateReview = props.updateReview;
  const review = props.review;
  const movie = props.movie;
  const id = props.id;

  // const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log("editing: ", props.editing);
  }, [props.editing]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, userId, id)
      .then(() => {
        const newArray = [
          ...movie.reviews.slice(0, index),
          ...movie.reviews.slice(index + 1),
        ];

        const newMovie = movie;
        newMovie.reviews = newArray;
        props.setMovie(newMovie);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
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
                props.setEditing((editing) => !editing);
                setReviewId(rev._id);
                // if (rev.user_id === userId) {
                //   updateReview(rev._id, index, review);
                // } else {
                //   alert("Sorry, you can only edit or delete your own reviews");
                // }
              }}
            >
              Edit
            </button>

            <button
              className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
              onClick={() => {
                if (rev.user_id === userId) {
                  deleteReview(rev._id, index);
                  props.getMovie(props.id);
                } else {
                  alert("Sorry, you can only edit or delete your own reviews");
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
        {props.editing && movie.reviews[index] == rev && (
          <div>EDIT YOUR REVIEW IN THE BOX ABOVE</div>
        )}
      </div>
    </>
  );
};

export default Review;
