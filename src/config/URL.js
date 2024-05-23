import axios from "axios";

const api = axios.create({
  baseURL: "http://13.213.208.92:9084/",
});

export default api;