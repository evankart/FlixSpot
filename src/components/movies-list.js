import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
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
    retrieveMovies();
    retrieveRatings();
  }, []);

  useEffect(() => {
    find(searchTitle, searchRating);
  }, [searchTitle, searchRating]);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        const newMovies = response.data.movies;
        setMovies(newMovies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        const newRatings = ["All Ratings"].concat(response.data);
        setRatings(newRatings);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        const newMovies = response.data.movies;
        setMovies(newMovies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findMovie = () => {
    console.log(
      `find by searchTitle: ${searchTitle} and searchRating: ${searchRating}`
    );
    find(searchTitle, searchRating);
  };
  // const findByTitle = (searchTitle) => {
  //   find(searchTitle, "title");
  // };

  // const findByRating = (searchRating) => {
  //   if (searchRating === "All Ratings") {
  //     retrieveMovies();
  //   } else {
  //     find(searchRating, "rated");
  //   }
  // };

  return (
    <div className="max-w-[1200px] mx-auto">
      <form class="flex wrap ml-auto mr-5 h-10 my-5 w-2/5">
        <input
          class="rounded-full px-5 mr-2 w-full bg-gray-100 drop-shadow-md text-right border-slate-200 border-2 outline-none"
          type="text"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            // findMovie();
            // findByTitle(e.target.value);
          }}
          placeholder="Search by Title"
        />

        <select
          class="rounded-full px-2 ml-auto w-auto text-center bg-gray-100 drop-shadow-md border-slate-200 border-2 outline-none"
          type="select"
          value={searchRating}
          onChange={(e) => {
            setSearchRating(e.target.value);
            // findMovie();
            // findByRating(e.target.value);
          }}
          placeholder="Search by Rating"
        >
          {ratings.map((rating) => {
            return <option value={rating}>{rating}</option>;
          })}
        </select>
      </form>

      <div className="flex flex-wrap max-w-7xl mx-auto">
        {movies.map((movie) => {
          let posterSrc;
          if (!movie.poster) {
            posterSrc =
              "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
          } else {
            posterSrc = movie.poster + "/100px180";
          }
          return (
            <div className="mx-auto max-w-[400px] sm:w-[32%] text-center justify-center p-5 mb-5 font-bold bg-white rounded-lg shadow-md">
              <Link to={"/movies/" + movie._id}>
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
                <p> {movie.rated}</p>
                <Link to={"/movies/" + movie._id}>View Reviews</Link>
              </div>
              <p className="text-base">{movie.title}</p>
              <p className="font-normal text-sm text-justify w-[90%] mx-auto">
                {movie.plot}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;
