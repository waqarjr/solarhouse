import axios from "axios";

const api = axios.create({
  baseURL: "https://solarhouse.pk/wp-json/wc/v3", 
  auth: {
    username: process.env.NEXT_PUBLIC_AUTH_USERNAME, 
    password: process.env.NEXT_PUBLIC_AUTH_PASSWORD  
  }
});
export default api;