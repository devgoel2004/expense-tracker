import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  let token;
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [category, setCategory] = useState("");
  const authUser = () => {
    token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };
  const getExpenseDetails = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const data = await axios.get(
        `http://localhost:8000/expense/${id}`,
        config
      );
      setAmount(data.data.expense.amount);
      setDescription(data.data.expense.description);
      setCategory(data.data.expense.category);
      setDate(data.data.expense.date);
    } catch (error) {
      console.log(error);
    }
  };
  const updateExpenseHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.put(
        `http://localhost:8000/expense/${id}`,
        {
          amount,
          description,
          date,
          category,
        },
        config
      );
      alert.success(data.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert.error("Something went wrong");
    }
  };
  const categoryOptions = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Restaurant",
    "Others",
  ];
  const deleteHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token);
      const data = await axios.delete(
        `http://localhost:8000/expense/${id}`,
        config
      );
      alert.success(data.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authUser();
    getExpenseDetails();
  }, []);
  return (
    <div className="create-expense">
      <h1>Expense Details</h1>
      <form action="" onSubmit={updateExpenseHandler}>
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          name="Category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          {categoryOptions.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" className="button" value="Update" />
      </form>
      <button className="button" onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseDetails;
