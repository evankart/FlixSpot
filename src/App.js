import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
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
