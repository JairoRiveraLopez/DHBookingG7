import axios from "axios";

export const backendApi = axios.create({
    baseURL: "http://52.14.228.70/DHBooking/",
});

const baseURL = "http://52.14.228.70/DHBooking/";
export default baseURL