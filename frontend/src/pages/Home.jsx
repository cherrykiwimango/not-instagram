import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import { handleError, handleSuccess } from "../components/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="container">
      Welcome {loggedInUser}
      <button onClick={handleLogOut}>LogOut</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
