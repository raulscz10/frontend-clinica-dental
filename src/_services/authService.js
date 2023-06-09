import axios from "axios";
import { global } from "../_global/global";

const authService = {};

authService.login = async (credentials) => {
    const body = {
        user_gmail : credentials.user_gmail,
        user_password : credentials.user_password,
    };

    return (await axios.post(global.BASE_URL + "/auth/login", body)).data;
};

authService.signIn = async (credentials) => {
    const body = {
        user_name: credentials.user_name,
        user_surname: credentials.user_surname,
        user_age: credentials.user_age,
        user_phone:credentials.user_phone,
        user_gmail: credentials.user_gmail,
        user_password: credentials.user_password,
    }

    return (await axios.post(global.BASE_URL + "/auth/signin", body));
};

export default authService;