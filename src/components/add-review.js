const AddReview = ({ submitted, setReview, saveReview }) => {
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
            placeholder="Add a review"
            className="w-full"
            onChange={onChangeReview}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
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
            Submit Review
          </button>
        </form>
      )}
    </>
  );
};

export default AddReview;
