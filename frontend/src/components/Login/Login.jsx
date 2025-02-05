import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      alert.success("User already logged In");
      navigate("/dashboard");
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const userData = {
        email,
        password,
      };
      const data = await axios.post(
        `https://expense-tracker-1-zioz.onrender.com/user/login`,
        userData
        // config
      );
      console.log(data.data.token);
      if (data.data.success === true) {
        localStorage.setItem("token", data.data.token);
        alert.success(data.data.message);
        navigate("/dashboard");
      } else if (data.response.success === false) {
        alert.error(data.message);
      }
    } catch (error) {
      console.log(error);
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    authUser();
  });
  return (
    <>
      <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form className="form-login" onSubmit={loginSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FcGoogle className="icons" />
                </a>
              </div>
              <span>or use your account</span>
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="/forgot/password">Forgot your password?</Link>
              <button type="submit" className="button">
                Sign In
              </button>
              <p className="create-account">
                Create Account:{" "}
                <span onClick={() => navigate("/signup")}>SignUp</span>
              </p>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="ghost button"
                  id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
