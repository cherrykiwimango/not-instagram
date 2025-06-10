import { useState } from "react";
import "./styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../components/utils";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please enter all fields");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        console.log(name);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="login-form">
      <div className="login-container">
      <h2 className="header">Welcome Back &rarr;</h2>
      <div className="link">
        <span>
          Don't have an account? <Link to="/signup">Signup here</Link>
        </span>{" "}
      </div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
      <ToastContainer />
    </div>
    </div>
    
  );
};

export default Login;
