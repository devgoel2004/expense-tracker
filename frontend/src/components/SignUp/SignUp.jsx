import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const SignUp = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const authUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  };
  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
        firstname: firstName,
        secondname: secondName,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const data = await axios.post(
        `https://expense-tracker-1-zioz.onrender.com/user/register`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (data.data.success === true) {
        alert.success("Register Success");
        navigate("/login");
      } else if (data.data.success === false) {
        alert.error("Something went wrong");
      }
    } catch (error) {
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
            <form className="form-login" onSubmit={signUpSubmit}>
              <h1>Sign Up</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FaGithub className="icons"></FaGithub>
                </a>
                <a href="#" className="social">
                  <FcGoogle className="icons" />
                </a>
                <a href="#" className="social">
                  <FaLinkedin className="icons" />
                </a>
              </div>
              <span>or use your account</span>
              <input
                className="input"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Second Name"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
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
              <button type="submit" className="button">
                Register
              </button>
              <p className="create-account">
                Have Account:{" "}
                <span onClick={() => navigate("/login")}>Login</span>
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
                <h1>Hello, Developers!</h1>
                <p>Enter your personal details and start journey with us</p>
                <p style={{ fontSize: "small" }}>Have Account? </p>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="ghost button"
                  id="signUp">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
