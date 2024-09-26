import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://alumnieconnect.runasp.net/api/'
  });