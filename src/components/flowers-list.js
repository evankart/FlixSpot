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

  const find = (query, by) => {
    FlowerDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setFlowers(response.data.flowers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    find(searchTitle, "title");
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveFlowers();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div>
      <form class="w-full">
        <div>
          <div class="flex flex-wrap -mx-3 mb-6 mx-auto">
            <div class="w-1/2 px-3 mb-6 md:mb-0 flex">
              <input
                class="rounded-full px-2 h-7"
                type="text"
                value={searchTitle}
                onChange={onChangeSearchTitle}
                placeholder="Search by Name"
              />
            </div>
            <button
              className="px-2 py-1 h-8 bg-gray-200 rounded-lg"
              type="button"
              onClick={findByTitle}
            >
              Search by Name
            </button>
          </div>
        </div>
        <div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-1/2 px-3 mb-6 md:mb-0">
              <select
                class="rounded-full px-2 h-7 w-full"
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
              onClick={findByRating}
            >
              Search by Rating
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap max-w-7xl mx-auto">
        {flowers.map((flower) => {
          console.log(flower.poster);
          let posterSrc;
          if (!flower.poster) {
            posterSrc =
              "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
          } else {
            posterSrc = flower.poster + "/100px180";
          }
          return (
            <div className="mx-auto max-w-[400px] sm:w-1/3 px-2 text-center justify-center mb-0 font-bold">
              <Link to={"/flowers/" + flower._id}>
                <img
                  className="w-full aspect-[2/3] object-cover mb-2 hover:saturate-[.65] transition-all"
                  src={posterSrc}
                  alt=""
                />
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
