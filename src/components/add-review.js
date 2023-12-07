const AddReview = ({
  saveReview,
  review,
  setReview,
  submitted,
  setSubmitted,
}) => {
  const onChangeReview = (e) => {
    setReview(e.target.value);
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>Review submitted successfully!</h4>
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
                e.preventDefault();
                saveReview();
                setSubmitted(true);
              }
            }}
          />

          <button
            className="flex ml-auto font-bold"
            onClick={(e) => {
              e.preventDefault();
              saveReview();
              setSubmitted(true);
            }}
            type="submit"
          >
            Submit Review
          </button>
        </form>
      )}
    </>
  );
};

export default AddReview;
