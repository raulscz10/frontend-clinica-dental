import axios from "axios";
import { global } from "../_global/global";

const userService = {};

userService.viewMyProfile = async (id) => {
    return (await axios.get(global.BASE_URL + `/api/customer/viewMyProfile/${id}`)).data;
};

export default userService;