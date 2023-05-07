import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import userService from "../../_services/userService";
//import UsersList from "../../components/users-list/UsersList";

function Admin() {
  //HOOKS
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersCount, setUsersCount] = useState();
  const [pageMax, setPageMax] = useState(1);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (isAdmin) {
      getAllUsers(authState.userToken, usersPage);
    } else {
      navigate("/");
    }
  }, [usersPage]);

  const getAllUsers = async (token, page) => {
    try {
      const response = await userService.getAllUsers(token, page);
      setUsers(response.results);
      setUsersCount(response.info.total_results);
      setPageMax(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  //HANDLERS
  const handleUsersList = (e) => {
    const { page, userId } = e.currentTarget.dataset;
    handleUsersListPaginations(page);
    handleSingleUser(userId);
  };

  const handleUsersListPaginations = (page) => {
    switch (page) {
      case "next":
        return setUsersPage((page) => page + 1);
      case "prev":
        return setUsersPage((page) => page - 1);
      case "first":
        return setUsersPage(1);
      case "last":
        return setUsersPage(pageMax);
    }
  };

  const handleSingleUser = (userId) => {
    console.log(userId);
  };

  return (
    <>
      {isAdmin && (
        <>
          <h1>Admin Panel</h1>
          <UsersList
            users={users}
            page={usersPage}
            count={usersCount}
            pageMax={pageMax}
            onChange={handleUsersList}
          />
        </>
      )}
    </>
  );
}

export default Admin;
