import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link } from "react-router-dom";

const FlowersList = (props) => {
  const [flowers, setFlowers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings", "G"]);

  useEffect(() => {
    retrieveFlowers();
    retrieveRatings();
  }, []);

  const retrieveFlowers = () => {
    FlowerDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setFlowers(response.data.flowers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    FlowerDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const findByTitle = (title) => {};

  return (
    <div>
      <form class="w-full">
        <div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-1/2 px-3 mb-6 md:mb-0 flex">
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={searchTitle}
                onChange={onChangeSearchTitle}
                placeholder="Search by Name"
              />
            </div>
            <button
              className="px-4 py-1 bg-gray-200 rounded-lg"
              type="button"
              // onClick={findByTitle}
            >
              Search by Name
            </button>
          </div>
        </div>
        <div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-1/2 px-3 mb-6 md:mb-0">
              <select
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="select"
                value={searchRating}
                onChange={onChangeSearchRating}
                placeholder="Search by Rating"
              >
                {ratings.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
              </select>
            </div>
            <button
              className="px-4 py-1 bg-gray-200 rounded-lg"
              type="button"
              // onClick={findByTitle}
            >
              Search by Rating
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlowersList;
