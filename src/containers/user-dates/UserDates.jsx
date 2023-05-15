import React, { useEffect, useState } from "react";
import "./UserDates.scss";
import { UserDate } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";

function UserDates() {
  //HOOKS
  const [dates, setDates] = useState([]);
  const [dateId, setDateId] = useState();
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
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

  const newDates = (dates) =>
    dates.map((date) => {
      date.name_treatment = date.treatment.name_treatment;
      date.schedule_ini = date.schedule.schedule_ini;
      date.schedule_fi = date.schedule.schedule_fi;
      date.inquiries_door = date.inquirie.inquiries_door;
      return date;
    });

  const handleUsersDate = (e) => {
    const { dateId } = e.currentTarget.dataset;
    handleSingleUser(dateId);
  };

  const handleSingleUser = (dateId) => {
    console.log(dateId);
    setShowDeleteIcon(true);
    setDateId(dateId);
  };

  return (
    <>
      {isUser && (
        <>
          <h1>Mis Citas</h1>
          <UserDate showDeleteIcon={showDeleteIcon} dateId={dateId} dates={newDates(dates)} onChange={handleUsersDate} />
        </>
      )}
    </>
  );
}

export default UserDates;
