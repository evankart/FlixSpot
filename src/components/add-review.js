import { useState } from "react";
import FlowerDataService from "../services/flowers";
import { Link, useParams } from "react-router-dom";

// const AddReview = (props) => {
//   let { id } = useParams();

//   let editing = false;
//   let initialReviewState = "";

//   if (props.location.state && props.location.state.currentReview) {
//     editing = true;
//     initialReviewState = props.location.state.currentReview.review;
//   }

//   const [review, setReview] = useState(initialReviewState);
//   const [submitted, setSubmitted] = useState(false);

//   const onChangeReview = (e) => {
//     const review = e.target.value;
//     setReview(review);
//   };

//   let data;
//   const saveReview = () => {
//     data = {
//       review: review,
//       name: props.user.name,
//       user_id: props.user.id,
//       flower_id: id,
//     };
//   };

//   if (editing) {
//     data.review_id = props.location.state.currentReview._id;

//     FlowerDataService.updateReview(data)
//       .then((response) => {
//         setSubmitted(true);
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } else {
//     FlowerDataService.createReview(data)
//       .then((response) => {
//         setSubmitted(true);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
//   return (
//     <div>
//       <p>test</p>
//       {submitted ? (
//         <div>
//           <h4>Review submitted successfully</h4>
//           <Link to={"/flowers/" + id}>Back to Flower</Link>
//         </div>
//       ) : (
//         <div>
//           <input type="text" value={review} onChange={onChangeReview}>
//             Review
//           </input>
//           <button onClick={{ saveReview }}>Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

function AddReview() {
  return (
    <div>
      <p>test</p>
    </div>
  );
}

export default AddReview;
