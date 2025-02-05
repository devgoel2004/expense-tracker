import React, { useEffect, useState } from "react";
import "./CreateExpense.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const CreateExpense = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(Date.now());
  const [category, setCategory] = useState("Food");
  const [token, setToken] = useState(null);
  const alert = useAlert();
  const authUser = () => {
    const x = localStorage.getItem("token");
    if (!x) {
      navigate("/login");
    }
    setToken(x);
  };
  const createExpenseHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        amount,
        description,
        date,
        category,
      };
      const data = await axios.post(`http://localhost:8000/expense`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.data.success === true) {
        alert.success(data.data.message);
      }
    } catch (error) {
      const message = error.response.data.message;
      alert.error(message);
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
  useEffect(() => {
    authUser();
  }, []);
  return (
    <div className="create-expense">
      <h1>Create Expense</h1>
      <form action="" onSubmit={createExpenseHandler}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
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
        <input type="submit" value="Create" className="button" />
      </form>
    </div>
  );
};

export default CreateExpense;
