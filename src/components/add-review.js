import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";

const AddReview = ({
  saveReview,
  review,
  buttonVal,
  setReview,
  submitted,
  edited,
  successMessage,
}) => {
  const onChangeReview = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>{successMessage}</h4>
        </div>
      ) : (
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
            onClick={(e) => {
              e.preventDefault();
              saveReview();
            }}
            type="submit"
          >
            {buttonVal}
          </button>
        </form>
      )}
    </>
  );
};

export default AddReview;
