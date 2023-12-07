const EditReview = ({ saveReview, review, setReview, edited, setEdited }) => {
  const onChangeReview = (e) => {
    setReview(e.target.value);
  };
  return (
    <>
      {edited ? (
        <div>
          <h4>Review updated successfully!</h4>
        </div>
      ) : (
        <form>
          <textarea
            value={review}
            placeholder="Update your review"
            className="w-full"
            onChange={onChangeReview}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveReview();
                setEdited((edited) => !edited);
              }
            }}
          />

          <button
            className="flex ml-auto font-bold"
            onClick={(e) => {
              e.preventDefault();
              saveReview();
              setEdited((edited) => !edited);
            }}
            type="submit"
          >
            Update Review
          </button>
        </form>
      )}
    </>
  );
};

export default EditReview;
