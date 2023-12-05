import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";

const AddReview = (props) => {
  // console.log(`props: `, props);

  // let editing = false;
  const [editing, setEditing] = useState(false);

  let { id } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const newReview = e.target.value;
    props.setReview(newReview);
    console.log(newReview);
  };

  let data;
  const saveReview = () => {
    data = {
      review: props.review,
      review_id: props.review_id,
      name: props.user.name,
      user_id: props.user.sub,
      movie_id: id,
    };

    console.log("saveReview data: ", data);

    if (editing === false) {
      console.log(editing);

      MovieDataService.createReview(data)
        .then((response) => {
          const val = true;
          setSubmitted(val);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (editing === true) {
      console.log(editing);

      console.log(`editing data: `, data);
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
      setEditing(false);
    } else {
      console.log("neither");
    }
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
              value={props.review}
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
          <button
            className="flex ml-auto font-bold"
            onClick={() => {
              if (editing === false || editing === undefined) {
                setEditing(true);
                console.log(`editing: true`);
              } else if (editing === true) {
                setEditing(false);
                console.log(`editing: false`);
              }
            }}
          >
            Edit Existing Review
          </button>
        </>
      )}
    </div>
  );
};

export default AddReview;
