import axios from "axios";
import { global } from "../_global/global";

const adminService = {};

adminService.getAllRoles = async (token) => {
    return (await axios.get(global.BASE_URL + "/api/admin/viewRolesAdmin")).data;
}

adminService.getAllUsers = async (token) => {
    return (await axios.get(global.BASE_URL + "/api/admin/viewUsersAdmin")).data;
}

export default adminService;