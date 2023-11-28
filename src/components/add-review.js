import { useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";

const AddReview = (props) => {
  let { id } = useParams();

  let editing = false;
  let initialReviewState = "";

  // if (props.location.state && props.location.state.currentReview) {
  //   editing = true;
  //   initialReviewState = props.location.state.currentReview.review;
  // }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  let data;
  const saveReview = () => {
    data = {
      review: review,
      name: props.user.name,
      user_id: props.user.sub,
      movie_id: id,
    };

    if (editing) {
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    let wrapper = document.querySelector("#addReviewWrapper");
    wrapper.classList.toggle("hidden");
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link
            to={"/movies/" + id}
            onClick={() => {
              setSubmitted(false);
            }}
          >
            Back to movie
          </Link>
        </div>
      ) : (
        <div>
          <textarea
            value={review}
            className="w-full"
            onChange={onChangeReview}
          />

          <button className="flex ml-auto font-bold" onClick={saveReview}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddReview;
