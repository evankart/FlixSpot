import { useState } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";

const AddReview = (props) => {
  // console.log(`props: `, props);

  let { id } = useParams();

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

    // console.log(`data: `, data);

    // console.log(`props.editing: ${props.editing}`);
    // if (props.editing === false) {
    //   console.log("failed");
    //   MovieDataService.createReview(data)
    //     .then((response) => {
    //       const val = true;
    //       setSubmitted(val);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // } else {
    //   console.log("succeeded");
    //   console.log(`props.editing: ${props.editing}`);
    //   // MovieDataService.updateReview(rev._id, index);
    //   console.log(`editing data: `, data);
    //   MovieDataService.updateReview(data)
    //     .then((response) => {
    //       setSubmitted(true);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    //   props.setEditing(false);
    // }

    // MovieDataService.createReview(data)
    //   .then((response) => {
    //     const val = true;
    //     setSubmitted(val);
    //     console.log(response.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // MovieDataService.updateReview(rev._id, index);
    // console.log(`editing data: `, data);
    MovieDataService.updateReview(
      "6568f326373f0e803811e0a1",
      "auth0|6568e3c8cc59856df9af6a0e",
      "test text"
    )
      .then((response) => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
    props.setEditing(false);

    setReview("");
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully!</h4>
        </div>
      ) : (
        <>
          {/*
           * on first load show add review box
           * on clicking Submit, add review to list hide the text box and submit button, show success message
           */}
          <form>
            <textarea
              value={review}
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
              onClick={saveReview}
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddReview;
