import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link, useParams } from "react-router-dom";

const Flower = (props) => {
  let { id } = useParams();

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
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlower(id);
  }, [id]);

  useEffect(() => {
    console.log("flower: ", flower);
  }, []);

  return (
    <div className="flex">
      <img src={flower.poster + "/100px180"} alt="" />

      <div className="mx-auto w-1/2] p-5">
        <h1 className="text-center font-bold text-lg">{flower.title}</h1>
        <p>{flower.plot}</p>
        {props.user && (
          <Link to={"/flowers/" + id + "/review"}>Add Review</Link>
        )}
        <h1>Reviews</h1>
        <p>
          {flower.reviews.map((rev) => {
            return (
              <ul className="list-disc">
                <li className="font-italic">{rev.review}</li>
              </ul>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default Flower;
