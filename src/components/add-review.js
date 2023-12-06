const AddReview = ({
  saveReview,
  review,
  buttonText,
  setReview,
  submitted,
  successMessage,
}) => {
  const onChangeReview = (e) => {
    setReview(e.target.value);
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
            {buttonText}
          </button>
        </form>
      )}
    </>
  );
};

export default AddReview;
