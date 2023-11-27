import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link } from "react-router-dom";
import Button from "./button";

const FlowersList = () => {
  const [flowers, setFlowers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState([
    "All Ratings",
    "G",
    "PG",
    "PG-13",
    "R",
    "Unrated",
  ]);

  useEffect(() => {
    retrieveFlowers();
    retrieveRatings();
  }, []);

  const retrieveFlowers = () => {
    FlowerDataService.getAll()
      .then((response) => {
        const newFlowers = response.data.flowers;
        setFlowers(newFlowers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    FlowerDataService.getRatings()
      .then((response) => {
        const newRatings = ["All Ratings"].concat(response.data);
        setRatings(newRatings);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = (query, by) => {
    FlowerDataService.find(query, by)
      .then((response) => {
        const newFlowers = response.data.flowers;
        setFlowers(newFlowers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = (searchTitle) => {
    find(searchTitle, "title");
  };

  const findByRating = (searchRating) => {
    if (searchRating === "All Ratings") {
      retrieveFlowers();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <form class="flex wrap ml-auto mr-5 h-10 my-5 w-2/5">
        <input
          class="rounded-full px-5 mr-2 w-full bg-gray-100 drop-shadow-md text-right border-slate-200 border-2 outline-none"
          type="text"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            findByTitle(e.target.value);
          }}
          placeholder="Search by Title"
        />

        <select
          class="rounded-full px-2 ml-auto w-auto text-center bg-gray-100 drop-shadow-md border-slate-200 border-2 outline-none"
          type="select"
          value={searchRating}
          onChange={(e) => {
            setSearchRating(e.target.value);
            findByRating(e.target.value);
          }}
          placeholder="Search by Rating"
        >
          {ratings.map((rating) => {
            return <option value={rating}>{rating}</option>;
          })}
        </select>
      </form>

      <div className="flex flex-wrap max-w-7xl mx-auto">
        {flowers.map((flower) => {
          let posterSrc;
          if (!flower.poster) {
            posterSrc =
              "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
          } else {
            posterSrc = flower.poster + "/100px180";
          }
          return (
            <div className="mx-auto max-w-[400px] sm:w-[32%] text-center justify-center p-5 mb-5 font-bold bg-white rounded-lg shadow-md">
              <Link to={"/flowers/" + flower._id}>
                <div>
                  <img
                    className=" w-full aspect-[2/3] object-cover mb-2 hover:opacity-80 transition-all"
                    alt=""
                    onError={(error) => {
                      console.log(error);
                      posterSrc =
                        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
                    }}
                    src={posterSrc}
                  />
                </div>
              </Link>

              <div className="flex justify-between text-xs w-[90%] mx-auto">
                <p> {flower.rated}</p>
                <Link to={"/flowers/" + flower._id}>View Reviews</Link>
              </div>
              <p className="text-base">{flower.title}</p>
              <p className="font-normal text-sm text-justify w-[90%] mx-auto">
                {flower.plot}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowersList;
