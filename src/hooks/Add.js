import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Add({ url }) {
  const [res, setResponse] = useState([]);
  axios.defaults.baseURL = "https://chat-apps-server.onrender.com";

  const postData = (data) => {
    axios
      .post(url, data)
      .then((res) => {
        if (typeof res.data === "object") {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { postData, res };
}

export default Add;
