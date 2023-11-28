import { useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";

const Test = () => {
  console.log("Testing");
};

Test();

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
    const newReview = e.target.value;
    setReview(newReview);
    console.log(newReview);
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
          const val = true;
          setSubmitted(val);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          const val = true;
          setSubmitted(val);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    let wrapper = document.querySelector("#addReviewWrapper");
    // wrapper.classList.toggle("hidden");
    setReview("");
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link
            to={"/movies/" + id}
            onClick={() => {
              const val = false;
              setSubmitted(val);
            }}
          >
            Back to movie
          </Link>
        </div>
      ) : (
        <form>
          <textarea
            value={review}
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
            onClick={saveReview}
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddReview;
