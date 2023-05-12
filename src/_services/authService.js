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

export default authService;