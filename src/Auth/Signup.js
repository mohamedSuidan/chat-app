import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../hooks/Add";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postData } = Add({
    url: "/signup",
  });
  const navigate = useNavigate();
  const signup = async () => {
    postData({
      name: name,
      email: email,
      password: password,
    });
    console.log("good");
    navigate("/signin");
  };
  return (
    <div className="center">
      <div className="form">
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="write name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="write email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="write password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
          If You Have an acount <Link to="/signin">Signin</Link>
        </p>
        <button type="submit" onClick={signup}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
