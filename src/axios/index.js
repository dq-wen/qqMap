/*
 * @Description: file content
 * @Author: Wenmin He
 * @Date: 2020-06-15 09:41:17
 * @LastEditors: Wenmin He
 * @LastEditTime: 2020-08-27 21:33:08
 */ 
import route from "@/router/index";
import axios from "axios";
axios.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem("hp_token");
  config.headers["X-Token"] = token;
  config.headers["Content-Type"] =  "application/json; charset=UTF-8";
  return config
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  error=>{
    console.log(error)
  }
);

export default axios