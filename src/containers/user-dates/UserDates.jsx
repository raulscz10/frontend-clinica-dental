import React, { useEffect, useState } from "react";
import "./UserDates.scss";
import { UserDate } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import infoService from "../../_services/infoService";

function UserDates() {
  //HOOKS
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [dateId, setDateId] = useState();
  const [showIcon, setShowIcon] = useState(false);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isUser = authState.userInfo.role == 3;

  useEffect(() => {
    if (isUser) {
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
      getAllTreatments();
      getAllSchedules();
    } else {
      navigate("/");
    }
  }, []);

  const getAllSchedules = async () => {
    try {
      const response = await infoService.getAllSchedules();
      setSchedules(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTreatments = async () => {
    try {
      const response = await infoService.getAllTreatments();
      setTreatments(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDatesUsers = async (token, id) => {
    try {
      const response = await userService.getAllDatesUsers(token, id);
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
    setShowIcon(true);
    setDateId(dateId);
  };

  return (
    <>
      {isUser && (
        <>
          <h1>Mis Citas</h1>
          <UserDate
            showIcon={showIcon}
            dateId={dateId}
            dates={newDates(dates)}
            onChange={handleUsersDate}
            schedules={schedules}
            treatments={treatments}
          />
        </>
      )}
    </>
  );
}

export default UserDates;
