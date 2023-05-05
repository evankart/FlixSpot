import { useState, useEffect } from "react";
import FlowerDataService from "../services/flowers";
import { Link } from "react-router-dom";

const Flower = (props) => {
  const [flower, setFlower] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getFlower = (id) => {
    FlowerDataService.get(id)
      .then((response) => {
        setFlower(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlower(props.match.params.id);
  }, [props.match.params.id]);

  return <div className="App">Flower</div>;
};

export default Flower;
