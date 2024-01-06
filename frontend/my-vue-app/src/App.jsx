import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Navbar from "./components/Navbar";
import Maincorousel from "./components/Maincorousel";
import Home from "./page/Home";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { StepperWithContent } from "./page/Stepper";
import Reset from "./components/Reset";
import Dashboard from "./Admin/Dashboard";
import Productspage from "./Admin/Productspage";
import User from "./Admin/User";
import AdminRoute from "./routes/Protectedroute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import Payment from "./page/Payment";
import Orderscheckout from "./Admin/Orderscheckout";
import Singleorder from "./Admin/Singleorder";
import Productreviews from "./Admin/productreviews";
import Userprofile from "./components/Userprofile";
import Myorder from "./components/Myorder";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);


  return (
    <>
      <Router className="font-mono">
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/checkout" element={<StepperWithContent />} />
          <Route exact path="/order/me" element={<Myorder />} />
          <Route exact path="/me" element={<Userprofile />} />
          <Route exact path="/password/reset/:token" element={<Reset />} />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <AdminRoute isAdmin={true}>
                <Dashboard />
              </AdminRoute>
            }
          />

          
          {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<Dashboard />}
        /> */}
          <Route exact path="/admin/product" element={<Productspage />} />
          <Route exact path="/admin/user" element={<User />} />
          <Route exact path="/admin/order" element={<Orderscheckout />} />
          <Route exact path="/admin/order/singleorder" element={<Singleorder />} />
          <Route exact path="/admin/review" element={<Productreviews />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
