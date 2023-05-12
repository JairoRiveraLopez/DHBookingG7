import axios from "axios";
import { isRouteErrorResponse } from "react-router-dom";
import { backendApi } from "../hooks/axiosBase"


export const getProductsByCategory = async (category) => {

  const resp = await backendApi.get(`/products/idCategory?idCategory=${category}`);
  return resp;
}

export const getProductsByCity = async (city) => {
  const resp = await backendApi.get(
    `/products/idCity?idCity=${city}`
  );
  return resp;
};

export const getProductsByCityAndDate = async (cityId,startDate,endDate) => {
 
  const resp = await backendApi.post(`/bookings/listAvailableProducts`,{
    startDate,
    endDate,
    cityId
  });
  return resp;
};


export const getProductsRandom = async () => {
  const resp = await backendApi.get('/products/random');
  return resp;
  
}

export const getProductsRecommended= async () => {
  const resp = await backendApi.get("/products/recommended");
  return resp;
};