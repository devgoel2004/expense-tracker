import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Pagination from "react-js-pagination";
const Dashboard = () => {
  const [expense, setExpense] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  let token = null;
  const authUser = () => {
    token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const getAllExpenses = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/expense/get/all/expense`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(data.expense.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpenses = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/expense?page=${currentPage}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(data.expenses.length);
      setExpense(data.expenses);
    } catch (error) {
      console.log(error);
      alert.error("Something went wrong");
    }
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
  const columns = [
    {
      name: "Amount(Rs)",
      selector: (row) => row.amount,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Edit",
      selector: (row) => (
        <FaEdit
          style={{ fontSize: "1.5rem", color: "green", cursor: "pointer" }}
          onClick={() => navigate(`/edit-expense/${row._id}`)}
        />
      ),
    },
  ];
  const categoryOptions = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Restaurant",
    "Others",
  ];
  useEffect(() => {
    authUser();
    getExpenses();
    getAllExpenses();
  }, [category, currentPage, count, token]);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
      }}>
      <h1 style={{ marginBottom: "20px" }}>Expense Tracking</h1>
      <DataTable columns={columns} data={expense} customStyles={customStyles} />
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={10}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
      <button className="button" onClick={() => navigate("/create-expense")}>
        Create Expense
      </button>
      <ul style={{ textAlign: "left", cursor: "pointer", listStyle: "none" }}>
        {categoryOptions.map((category) => (
          <li key={category} onClick={() => setCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
      <button className="button" onClick={() => setCategory("")}>
        Reset
      </button>
    </div>
  );
};

export default Dashboard;
