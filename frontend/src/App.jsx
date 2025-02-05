import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateExpense from "./components/CreateExpense/CreateExpense";
import ExpenseDetails from "./components/ExpenseDetails/ExpenseDetails";
import Profile from "./components/Profile/Profile";
import Error from "./components/Error/Error";
import Users from "./components/Users/Users";
function App() {
  const [token, setToken] = useState(null);
  const authUser = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    authUser();
  }, [token]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path={"/dashboard"} element={<Dashboard />} />
          <Route exact path="/create-expense" element={<CreateExpense />} />
          <Route
            exact
            path={`/edit-expense/:id`}
            element={<ExpenseDetails />}
          />
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
