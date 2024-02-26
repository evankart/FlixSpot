import { useState, useEffect, useMemo } from "react";
// import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

const MoviesList = () => {
  // const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  // const [searchRating, setSearchRating] = useState("");
  const [resultsCount, setResultsCount] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [movieResults, setMovieResults] = useState([]);
  const [moviesWithDetails, setMoviesWithDetails] = useState([]);

  // const ratings = ["All Ratings", "G", "PG", "PG-13", "R", "UNRATED"];

  // themoviedb genre ids
  const genreIds = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  // let genreName = genreIds.find((genreId) => genreId.id === 9648);
  // console.log(genreName.name);

  // wrap API options in useMemo hook to prevent multiple renders
  const options = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmE1N2RkYjU4NDVjODY1OWFmY2FlMjhhMDhiMjJmNiIsInN1YiI6IjY1Y2E5N2MzMTI5NzBjMDE3YmM1NWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJn5j2iz8sMUouM62xtJo5d4bstYzgmdp8HFVJD6Wio",
      },
    };
  }, []);

  // Get trending movies from themoviedb API on startups
  useEffect(() => {
    const url = "https://api.themoviedb.org/3/trending/movie/week";

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovieResults(json.results);
        console.log("movieResults: ", json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  // Get movie details for each movie in movieResults
  useEffect(() => {
    console.log("movieResults before: ", movieResults);
    if (Array.isArray(movieResults)) {
      Promise.all(
        movieResults.map((movie) =>
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
            .then((response) => response.json())
            .then((json) => ({ ...movie, details: json }))
        )
      )
        .then((moviesWithDetails) => setMoviesWithDetails(moviesWithDetails))
        .catch((err) => console.error(err));
    }
  }, [movieResults, options]);

  // Update # of search results returned by query
  useEffect(() => {
    setResultsCount(movieResults.length);
  }, [movieResults]);

  // Search for movies as query term changes
  useEffect(() => {
    find(searchTitle);
  }, [searchTitle]);

  // const retrieveMovies = () => {
  //   MovieDataService.getAll(pageCount - 1)
  //     .then((response) => {
  //       const newMovies = response.data.movies;

  //       setMovies(newMovies);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const find = (query, by) => {
  //   MovieDataService.find(query, by)
  //     .then((response) => {
  //       const newMovies = response.data.movies;
  //       setMovies(newMovies);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   setPageCount(1);
  // };

  function find(query) {
    query === ""
      ? console.log("no search term entered")
      : fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            const newMovies = response.results;
            setMovieResults(newMovies);
          })
          .catch((err) => console.error(err));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <form
        class="flex wrap ml-auto mr-5 h-10 my-5 w-5/6 sm:w-3/5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Title Search Input Field */}
        <input
          class="rounded-full px-5 mr-2 w-full bg-gray-100 drop-shadow-md text-right border-slate-200 border-2 outline-none"
          type="text"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
          placeholder="Search by Title"
        />
      </form>

      <div className="flex flex-wrap max-w-7xl mx-auto">
        {resultsCount === 0 ? (
          <div className="flex justify-center w-full my-5">
            No Results Found
          </div>
        ) : (
          moviesWithDetails.map((movie) => {
            /* console.log("movie with details: ", movie);*/
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

            fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
              .then((response) => response.json())
              .then((json) => {
                movie.details = json;
              })
              .catch((err) => console.error(err));

            return (
              <div className="mx-auto max-w-[400px] min-h-[300px] sm:w-[32%] text-center justify-center p-5 mb-5 font-bold bg-white rounded-lg shadow-md">
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
                  <p>
                    {" "}
                    {movie.vote_average
                      ? `${Math.round(movie.vote_average * 10) / 10}/10`
                      : "No rating"}
                  </p>
                  <Link to={"/movies/" + movie.id}>View Reviews</Link>
                </div>
                <p className="text-base">{movie.title}</p>
                <p className="font-normal text-sm text-justify w-[90%] mx-auto">
                  {movie.details.overview
                    ? `${
                        movie.details.overview.length < 250
                          ? movie.details.overview
                          : movie.details.overview.substring(0, 250) + "..."
                      }`
                    : "No summary available"}
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
