import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navbar";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Review from "./components/review";

function App() {
  const { user } = useAuth0();
  let profilePicture;
  if (user) {
    profilePicture = user.picture;
  }

  // // themoviedb API
  // const url = "https://api.themoviedb.org/3/authentication";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmE1N2RkYjU4NDVjODY1OWFmY2FlMjhhMDhiMjJmNiIsInN1YiI6IjY1Y2E5N2MzMTI5NzBjMDE3YmM1NWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJn5j2iz8sMUouM62xtJo5d4bstYzgmdp8HFVJD6Wio",
  //   },
  // };

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error("error:" + err));

  return (
    <div className="bg-f8 h-screen overflow-x-hidden font-poppins">
      <Navbar profilePicture={profilePicture} />

      <Routes>
        <Route path={"/"} element={<MoviesList />} />
        <Route path={"/movies/:id/"} element={<Movie user={user} />} />
        <Route path={"/movies/:id/review"} element={<Review user={user} />} />
      </Routes>
    </div>
  );
}
export default App;
