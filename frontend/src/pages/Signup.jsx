import { Link, useNavigate } from "react-router-dom";
import "./styles/Signup.css";
import { useState } from "react";
import { handleError, handleSuccess } from "../components/utils";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const copySignUpInfo = { ...signUpInfo };
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo);
  };
  console.log("Sign up info: ", signUpInfo);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("Please enter all fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      const { success, message } = result;
      if (!success) {
        return handleError(message);
      } else {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Get Started &rarr;</h2>
      <div className="link">
        <span>
          Already have an account? <Link to="/login">Login here</Link>
        </span>{" "}
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="input-item">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-item">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-item">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a password of 6 characters"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
