import axios from "axios";

const api = axios.create({
  baseURL: "https://solarhouse.pk/wp-json/wc/v3", 
  auth: {
    username: process.env.AUTH_USERNAME, 
    password: process.env.AUTH_PASSWORD  
  }
});
export default api;