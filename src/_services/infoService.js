import axios from "axios";
import { global } from "../_global/global";

const infoService = {};

infoService.getAllSchedules = async () => {
  return (await axios.get(global.BASE_URL + "/info/horario")).data;
};

infoService.getAllTreatments = async () => {
    return (await axios.get(global.BASE_URL + "/info/tratamiento")).data;
};

export default infoService;
