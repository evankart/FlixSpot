import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import FlowersList from "./components/flowers-list";
import Map from "./components/map";
import Flower from "./components/flower";
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
    <div className="bg-panda h-screen overflow-x-hidden">
      <Navbar profilePicture={profilePicture} />

      <div className="bg-panda rounded-lg  mx-auto py-1">
        <Routes>
          {/* <Route path={"/flowers"} element={<FlowersList />} /> */}
          <Route path={"/"} element={<FlowersList />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/settings"} element={<Settings />} />

          <Route
            path={"/flowers/:id/review"}
            element={<AddReview user={user} />}
          />

          <Route path={"/flowers/:id/"} element={<Flower user={user} />} />

          <Route path={"/login"} element={<Login />} />

          <Route path={"/map"} element={<Map />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
