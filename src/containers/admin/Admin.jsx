import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adminService from "../../_services/adminService";
import UsersList from "../../components/users-list";

function Admin() {
  //HOOKS
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == 1;

  useEffect(() => {
    if (isAdmin) {
      getAllUsers(authState.userToken);
    } else {
      navigate("/");
    }
  }, []);

  const getAllUsers = async (token) => {
    try {
      const response = await adminService.getAllUsers(token);
      setUsers(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAdmin && (
        <>
          <h1>Admin Panel</h1>
          <UsersList
            users={users}
          />
        </>
      )}
    </>
  );
}

export default Admin;
