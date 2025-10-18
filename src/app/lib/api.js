import axios from "axios";
// const token = localStorage.getItem("_user_token_auth");
// console.log(token)
const api = axios.create({
  baseURL: "https://solarhouse.pk/wp-json/wc/v3", 
  // headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  auth: {
    username: process.env.NEXT_PUBLIC_AUTH_USERNAME, 
    password: process.env.NEXT_PUBLIC_AUTH_PASSWORD  
  }
});
export default api;