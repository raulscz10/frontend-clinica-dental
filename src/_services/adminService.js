import axios from "axios";
import { global } from "../_global/global";

const adminService = {};

adminService.getAllRoles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewRolesAdmin", config)
  ).data;
};

adminService.getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewUsersAdmin", config)
  ).data;
};

adminService.getAllTreatments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewTreatmentsAdmin", config)
  ).data;
};

adminService.getAllDates = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewDatesAdmin", config)
  ).data;
};

adminService.getAllDirections = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewDirectionsAdmin", config)
  ).data;
};

adminService.getAllSchedules = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewSchedulesAdmin", config)
  ).data;
};

adminService.getAllInquiries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + "/api/admin/viewInquiriesAdmin", config)
  ).data;
};

export default adminService;
