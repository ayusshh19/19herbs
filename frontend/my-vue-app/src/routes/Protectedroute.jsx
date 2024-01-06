import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";

const AdminRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const data = useSelector((state) => state.user);
  console.log(data);
  console.log(loading,user,isAuthenticated);
  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (!loading && isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Fragment>{loading === false ? children : "hello"}</Fragment>;
};

export default AdminRoute;