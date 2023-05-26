import axios from "axios";
import React, { useEffect } from "react";

const Delivery = () => {
  useEffect(() => {
    axios
      .get("/api/deliveries/deliverer", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("/api/deliveries/consumer", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("소비자");
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
