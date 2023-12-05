import "./App.css";
import { Routes, Route } from "react-router-dom";
import Review from "./components/review";
import MoviesList from "./components/movies-list";
import Map from "./components/map";
import Movie from "./components/movie";
import Login from "./components/login";
import Navbar from "./components/navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/profile";
import Settings from "./components/settings";

function App() {
  const { user } = useAuth0();

  let profilePicture;
  if (user) {
    profilePicture = user.picture;
  }

  return (
    <div className="bg-f8 h-screen overflow-x-hidden font-poppins">
      <Navbar profilePicture={profilePicture} />

      <div className="rounded-lg  mx-auto py-1">
        <Routes>
          {/* <Route path={"/movies"} element={<MoviesList />} /> */}
          <Route path={"/"} element={<MoviesList />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/settings"} element={<Settings />} />

          <Route path={"/movies/:id/review"} element={<Review user={user} />} />

          <Route path={"/movies/:id/"} element={<Movie user={user} />} />

          <Route path={"/login"} element={<Login />} />

          <Route path={"/map"} element={<Map />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
