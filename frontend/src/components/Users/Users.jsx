import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Second Name",
      selector: (row) => row.secondName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];
  const authUser = () => {
    let x = localStorage.getItem("token");
    if (!x) {
      navigate("/login");
    }
    setToken(x);
  };
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "tomato",
        color: "white",
        textAlign: "center",
        fontSize: "0.8rem",
        fontWeight: "bold",
      },
    },
  };
  const getUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.get(
        `https://expense-tracker-1-zioz.onrender.com/user/getAllUsers`,
        config
      );
      setUsers(data.data.users);
    } catch (error) {
      console.log(error.response.data.message);
      alert.success(error.response.data.message);
    }
  };
  useEffect(() => {
    authUser();
    getUsers();
  }, [token]);
  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        minHeight: "90vh",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <h1>Users</h1>
      <DataTable columns={columns} data={users} customStyles={customStyles} />
    </div>
  );
};

export default Users;
