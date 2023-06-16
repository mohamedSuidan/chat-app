import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../hooks/Add";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { postData, res } = Add({
    url: "/signin",
  });

  const signin = async () => {
    postData({
      email: email,
      password: password,
    });
    setTimeout(() => {
      window.location.replace("/");
    }, 300);
  };

  return (
    <div className="center">
      <div className="form">
        <h2>Signin</h2>
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
          If You Don't Have an acount <Link to="/signup">Signup</Link>
        </p>
        <button type="submit" onClick={signin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signin;
