import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile";

const Flower = (props) => {
  // let userId = props.user.sub;
  let userId = "auth0|64068f7b1f5a4051145edb68";

  let { id } = useParams();
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
        setFlower(() => {
          console.log("flower.reviews pre: ", ...flower.reviews);
          flower.reviews.splice(index, 1);
          console.log("flower.reviews post: ", ...flower.reviews);
          return { ...flower };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <img
        className="w-2/3 sm:w-1/2 mx-auto"
        src={flower.poster + "/100px180"}
        alt=""
      />

      <div className="mx-auto w-1/2] p-5">
        <h1 className="text-center font-bold text-xl mb-1">{flower.title}</h1>
        <p className="mb-3">{flower.plot}</p>
        {isAuthenticated && (
          <button className="bg-teal px-2 rounded-xl h-6 font-bold text-sm mb-4">
            <Link to={"/flowers/" + id + "/review"}>Add a Review</Link>
          </button>
        )}
        <h1 className="font-bold my-2">Reviews:</h1>

        {flower.reviews.map((rev, index) => {
          return (
            <div className="mb-3">
              <h3 className="text-sm">
                <strong>{`${rev.name} `}</strong>
                {`reviewed on ${moment(rev.date).format("Do MMMM YYYY")}`}
                {index + 1}
              </h3>
              <p className="text-sm">{rev.review}</p>

              {isAuthenticated && rev.user_id === userId && (
                <div className="h-4">
                  <button className="bg-teal px-2 text-xs h-full mr-1 rounded-xl font-bold">
                    <Link to={"/flowers/" + id + "/review"}>Edit</Link>
                  </button>

                  <button
                    className="bg-teal px-2 text-xs h-full mr-2 rounded-xl font-bold"
                    onClick={() => {
                      if (rev.user_id === userId) {
                        deleteReview(rev._id, index);
                      } else {
                        console.log("failed");
                        alert(
                          "Sorry, you can only edit or delete your own reviews"
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {!isAuthenticated && <div>Log in to edit and delete reviews</div>}
      </div>
    </div>
  );
};

export default Flower;
