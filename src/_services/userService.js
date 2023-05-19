import axios from "axios";
import { global } from "../_global/global";

const userService = {};

userService.viewMyProfile = async (id) => {
  return (
    await axios.get(global.BASE_URL + `/api/customer/viewMyProfile/${id}`)
  ).data;
};

userService.updateMyProfile = async (id, credentials) => {
  const body = {
    user_name: credentials.user_name,
    user_surname: credentials.user_surname,
    user_password: credentials.user_password,
    user_age: credentials.user_age,
    user_phone: credentials.user_phone,
    user_gmail: credentials.user_gmail,
  };

  return await axios.put(
    global.BASE_URL + `/api/customer/updateUserProfile/${id}`,
    body
  );
};

userService.getAllDatesUsers = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return(await axios.get(global.BASE_URL + `/api/customer/viewDates/${id}`,config)).data;
};

userService.deleteDate = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.delete(global.BASE_URL + `/api/customer/deleteUserDates/${id}`, config)).data;
};

userService.createUserDate = async (token, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const body = {
    date: credentials.date,
    id_treatment: credentials.id_treatment,
    id_patient: credentials.id_patient,
    id_schedule: credentials.id_schedule,
    id_inquiries: credentials.id_inquiries,
  };

  console.log(body);

  return (await axios.post(global.BASE_URL + `/api/customer/newUserDate`, body, config)).data;
};

userService.updateDate = async (token, credentials, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    date: credentials.date,
    id_treatment: credentials.id_treatment,
    id_patient: credentials.id_patient,
    id_schedule: credentials.id_schedule,
    id_inquiries: credentials.id_inquiries,
  };

  return (await axios.put(global.BASE_URL + `/api/customer/updateUserDate/${id}`, body, config)).data;
};

export default userService;
