import axios from "axios";
import React, { useEffect } from "react";

const Delivery = () => {
  useEffect(() => {
    axios
      .get("/api/deliveries/deliverer")
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div></div>;
};

export default Delivery;
