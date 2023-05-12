import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { isRouteErrorResponse } from "react-router-dom";
import { backendApi } from "../hooks/axiosBase"


export const getBookingsByProductId = async (idProduct) => {
  const resp = await backendApi.get(`/bookings/idProduct?idProduct=${idProduct}`);
  //let forbiddenDates = []
  ///resp.data.map(item => forbiddenDates.push( new Date(item)))
  //console.log('estoy en fetch')
  //console.log(forbiddenDates)
  //return forbiddenDates;
  return resp;
}

export const getBookingsByUserId = async (idUser, token) => {
    console.log(idUser, token)
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const resp = await backendApi.get(`/bookings/my-bookings/${idUser}`, config);
    console.log(resp)
    return resp;
}


export const deleteBookingByUser = async (id,token) => {
  let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const resp = await backendApi.delete(`/bookings/${id}`, config);

    return resp
}