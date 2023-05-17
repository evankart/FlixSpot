import { useState } from "react";
import FlowerDataService from "../services/flowers";
import { Link, useParams } from "react-router-dom";

const AddReview = (props) => {
  let { id } = useParams();

  if (props.user) {
    // let user_id = props.user.sub;
    let user_id = "1234";
  }

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
    console.log(review);
  };

  let data;
  const saveReview = () => {
    data = {
      review: review,
      name: props.user.name,
      user_id: props.user.sub,
      flower_id: id,
    };

    console.log(data.review, data.name, data.user_id, data.flower_id);

    if (editing) {
      FlowerDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      FlowerDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link
            to={"/flowers/" + id}
            onClick={() => {
              setSubmitted(false);
            }}
          >
            Back to Flower
          </Link>
        </div>
      ) : (
        <div>
          <input type="text" value={review} onChange={onChangeReview} />

          <button onClick={saveReview}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddReview;
