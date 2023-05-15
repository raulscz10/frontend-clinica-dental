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

userService.createUserDate = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.post(global.BASE_URL + `/api/customer/newUserDate`, config)).data;
};

userService.updateDate = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.delete(global.BASE_URL + `/api/customer/updateUserDate/${id}`, config)).data;
};

export default userService;
