import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import App from "./App";
import Chat from "./Chat";
const router = createBrowserRouter([
  {
    path: "/signup",
    element: !localStorage.getItem("user") ? <Signup /> : <Navigate to="/" />,
  },
  {
    path: "/signin",
    element: !localStorage.getItem("user") ? <Signin /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: localStorage.getItem("user") ? <App /> : <Navigate to="/signup" />,
  },
  {
    path: "/chat/:id",
    element: localStorage.getItem("user") ? (
      <Chat />
    ) : (
      <Navigate to="/signup" />
    ),
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
