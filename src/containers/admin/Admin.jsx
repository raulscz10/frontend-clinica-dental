import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adminService from "../../_services/adminService";
import {
  RolesList,
  UsersList,
  DirectionsList,
  InquiriesList,
  SchedulesList,
  TreatmentsList,
  DatesList,
} from "../../components";

function Admin() {
  //HOOKS
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [dates, setDates] = useState([]);
  const [directions, setDirections] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == 1;

  useEffect(() => {
    if (isAdmin) {
      getAllUsers(authState.userToken);
      getAllRoles(authState.userToken);
      getAllDates(authState.userToken);
      getAllTreatments(authState.userToken);
      getAllDirections(authState.userToken);
      getAllInquiries(authState.userToken);
      getAllSchedules(authState.userToken);
    } else {
      navigate("/");
    }
  }, []);

  const getAllUsers = async (token) => {
    try {
      const response = await adminService.getAllUsers(token);
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRoles = async (token) => {
    try {
      const response = await adminService.getAllRoles(token);
      setRoles(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTreatments = async (token) => {
    try {
      const response = await adminService.getAllTreatments(token);
      setTreatments(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDates = async (token) => {
    try {
      const response = await adminService.getAllDates(token);
      setDates(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDirections = async (token) => {
    try {
      const response = await adminService.getAllDirections(token);
      setDirections(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSchedules = async (token) => {
    try {
      const response = await adminService.getAllSchedules(token);
      setSchedules(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInquiries = async (token) => {
    try {
      const response = await adminService.getAllInquiries(token);
      setInquiries(response);
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
      date.user_name = date.patient.user_name,
      date.user_surname = date.patient.user_surname
      return date;
    });
  return (
    <>
      {isAdmin && (
        <>
          <h1>Admin Panel</h1>
          <RolesList roles={roles} />
          <DirectionsList directions={directions} />
          <UsersList users={users} />
          {/* <InquiriesList inquiries={inquiries} /> */}
          <SchedulesList schedules={schedules} />
          <TreatmentsList treatments={treatments} />
          <DatesList dates={newDates(dates)} />
        </>
      )}
    </>
  );
}

export default Admin;
