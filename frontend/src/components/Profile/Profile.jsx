import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const Profile = () => {
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const alert = useAlert();
  const navigate = useNavigate();
  let x;
  const authUser = () => {
    x = localStorage.getItem("token");
    if (!x) {
      navigate("/login");
    }
    setToken(x);
  };
  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`https://expense-tracker-1-zioz.onrender.com/user/profile`, {
        headers: {
          Authorization: `Bearer ${x}`,
        },
      });
      const user = data.user;
      setFirstName(user.firstName);
      setSecondName(user.secondName);
      setEmail(user.email);
      setUserId(user._id);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        firstName,
        secondName,
        email,
        userId,
      };
      const data = await axios.put(
        `https://expense-tracker-1-zioz.onrender.com/user/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data.success);
      if (data.data.success === true) {
        alert.success("Profile Updated");
        navigate("/profile");
      } else {
        alert.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert.success(error.response.data.message);
    }
  };
  useEffect(() => {
    authUser();
    getUserDetails();
  }, [token]);
  return (
    <div
      style={{
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <h1>Profile Details</h1>
      <form action="" onSubmit={updateProfileHandler}>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={secondName}
          placeholder="Second Name"
          onChange={(e) => setSecondName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button">
          update
        </button>
      </form>
    </div>
  );
};

export default Profile;
