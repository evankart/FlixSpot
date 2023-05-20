import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";

const Flower = (props) => {
  // let userId = props.user.sub;
  let userId = "auth0|64068f7b1f5a4051145edb68";

  let { id } = useParams();
  console.log("id: ", id);
  const { isAuthenticated } = useAuth0();

  const [flower, setFlower] = useState({
    id: id,
    title: "",
    rated: "",
    reviews: [],
  });

  const getFlower = (id) => {
    FlowerDataService.get(id)
      .then((response) => {
        setFlower(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlower(id);
  }, [id]);

  useEffect(() => {}, []);

  const deleteReview = (reviewId, index) => {
    FlowerDataService.deleteReview(reviewId, userId)
      .then(() => {
        setFlower((prevState) => {
          prevState.reviews.splice(index, 1);
          return { ...prevState };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log("reviews: ", flower.reviews);

  return (
    <div className="flex">
      <img className="w-1/2" src={flower.poster + "/100px180"} alt="" />

      <div className="mx-auto w-1/2] p-5">
        <h1 className="text-center font-bold text-lg">{flower.title}</h1>
        <p>{flower.plot}</p>
        {isAuthenticated && (
          <Link className="leading-10" to={"/flowers/" + id + "/review"}>
            Add Review
          </Link>
        )}
        <h1>Reviews:</h1>

        {flower.reviews.map((rev, index) => {
          console.log("rev: ", rev.user_id);
          return (
            isAuthenticated &&
            rev.user_id === userId && (
              <div>
                <h3 className="text-sm">
                  {`${rev.name} reviewed on ${moment(rev.date).format(
                    "Do MMMM YYYY"
                  )}`}
                  {index + 1}
                </h3>
                <p className="text-xs">{rev.review}</p>
                <Link to={"/flowers/" + id + "/review"}>Edit</Link>
                <button
                  onClick={() => {
                    deleteReview(rev._id, index);
                  }}
                >
                  Delete
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Flower;
