import React, { useEffect, useState } from "react";
import "./UserDates.scss";
import { UserDate } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";

function UserDates() {
  //HOOKS
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isUser = authState.userInfo.role == 3;

  useEffect(() => {
    if (isUser) {
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
    } else {
      navigate("/");
    }
  }, []);

  const getAllDatesUsers = async (token, id) => {
    try {
      const response = await userService.getAllDatesUsers(token, id);
      console.log(response);
      setDates(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isUser && (
        <>
          <h1>Mis Citas</h1>
          <UserDate dates={dates} />
        </>
      )}
    </>
  );
}

export default UserDates;
