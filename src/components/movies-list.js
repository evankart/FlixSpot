import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [resultsCount, setResultsCount] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [popularMovies, setPopularMovies] = useState([]);

  const ratings = ["All Ratings", "G", "PG", "PG-13", "R", "UNRATED"];
  // Retrieve movies on page load
  useEffect(() => {
    retrieveMovies(pageCount);
  }, [pageCount]);

  useEffect(() => {
    // // themoviedb API
    const url = "https://api.themoviedb.org/3/trending/movie/week";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmE1N2RkYjU4NDVjODY1OWFmY2FlMjhhMDhiMjJmNiIsInN1YiI6IjY1Y2E5N2MzMTI5NzBjMDE3YmM1NWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJn5j2iz8sMUouM62xtJo5d4bstYzgmdp8HFVJD6Wio",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setPopularMovies(json.results);
        console.log("popularMovies: ", json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  useEffect(() => {
    setResultsCount(movies.length);
    console.log(resultsCount);
  }, [movies, resultsCount]);

  // Update movie lis when search terms are updated
  useEffect(() => {
    find(searchTitle, searchRating);
  }, [searchTitle, searchRating, popularMovies]);

  useEffect(() => {
    console.log("popularMovies: ", popularMovies);
  }, [popularMovies]);

  const retrieveMovies = () => {
    MovieDataService.getAll(pageCount - 1)
      .then((response) => {
        const newMovies = response.data.movies;

        setMovies(newMovies);
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
    setPageCount(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form class="flex wrap ml-auto mr-5 h-10 my-5 w-5/6 sm:w-3/5">
        {/* Title Search Input */}
        <input
          class="rounded-full px-5 mr-2 w-full bg-gray-100 drop-shadow-md text-right border-slate-200 border-2 outline-none"
          type="text"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
          placeholder="Search by Title"
        />

        {/* Rating Search Selection */}
        <select
          class="rounded-full px-2 ml-auto w-auto text-center bg-gray-100 drop-shadow-md border-slate-200 border-2 outline-none"
          type="select"
          value={searchRating}
          onChange={(e) => {
            setSearchRating(e.target.value);
          }}
          placeholder="Search by Rating"
        >
          {/* Update ratings choices in ratings variable */}
          {ratings.map((rating) => {
            return <option value={rating}>{rating}</option>;
          })}
        </select>
      </form>

      <div className="flex flex-wrap max-w-7xl mx-auto">
        {resultsCount === 0 ? (
          <div className="flex justify-center w-full my-5">
            No Results Found
          </div>
        ) : (
          popularMovies.map((movie) => {
            /* let posterSrc; */

            let posterSrc = `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`;

            /* if (!movie.poster) {
              posterSrc =
                "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
            } else {
              posterSrc = movie.poster + "/100px180";
            } */

            const options = {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmE1N2RkYjU4NDVjODY1OWFmY2FlMjhhMDhiMjJmNiIsInN1YiI6IjY1Y2E5N2MzMTI5NzBjMDE3YmM1NWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJn5j2iz8sMUouM62xtJo5d4bstYzgmdp8HFVJD6Wio",
              },
            };

            let movieDetails = "";

            fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
              .then((response) => response.json())
              .then((json) => {
                console.log("movie details: ", json);
                movieDetails = json;
                console.log(movieDetails.overview);
              })
              .catch((err) => console.error(err));

            return (
              <div className="mx-auto max-w-[400px] sm:w-[32%] text-center justify-center p-5 mb-5 font-bold bg-white rounded-lg shadow-md">
                <Link to={"/movies/" + movie.id}>
                  <div>
                    <img
                      className=" w-full aspect-[2/3] object-cover mb-2 hover:opacity-80 transition-all"
                      alt=""
                      onError={(error) => {
                        // console.log(error);
                        posterSrc =
                          "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
                      }}
                      src={posterSrc}
                    />
                  </div>
                </Link>

                <div className="flex justify-between text-xs w-[90%] mx-auto">
                  <p> {movie.rated ? movie.rated : "No rating"}</p>
                  <Link to={"/movies/" + movie.id}>View Reviews</Link>
                </div>
                <p className="text-base">{movie.title}</p>
                <p className="font-normal text-sm text-justify w-[90%] mx-auto">
                  {movieDetails.overview}
                </p>
              </div>
            );
          })
        )}
      </div>
      {resultsCount !== 0 ? (
        <div className="page-counter text-center m-3 mb-6 flex justify-center">
          <button
            className="px-2 mx-1 bg-white rounded shadow-lg"
            onClick={() => {
              if (pageCount > 1) {
                setPageCount(pageCount - 1);
              }
              console.log(pageCount);
            }}
          >
            &#60;
          </button>
          <div className="font-bold mx-2">Page {pageCount}</div>
          <button
            className="px-2 mx-1 bg-white rounded shadow-lg"
            onClick={() => {
              if (resultsCount === 12) {
                setPageCount(pageCount + 1);
              }
              console.log(pageCount);
            }}
          >
            &#62;
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MoviesList;
