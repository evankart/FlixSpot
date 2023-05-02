import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import FlowersList from "./components/flowers-list";
import Flower from "./components/flower";
import Login from "./components/login";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>
      </div>
    </div>
  );
}
export default App;
