import axios from "axios";

// Booking controller instance
const bookingApi = axios.create({
  // baseURL: "http://52.74.83.44:7080/booking-service/api/",
  baseURL: "https://uat.hrisasia.com/booking-service/api/",
});

// User controller instance
const userApi = axios.create({
  // baseURL: "http://52.74.83.44:7080/user-service/api/",
  baseURL: "https://uat.hrisasia.com/user-service/api/",
});

// Driver controller instance
const driverApi = axios.create({
  // baseURL: "http://52.74.83.44:7080/driver-service/api/",
  baseURL: "https://uat.hrisasia.com/driver-service/api/",
});

const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      const token = sessionStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

addAuthInterceptor(bookingApi);
addAuthInterceptor(userApi);
addAuthInterceptor(driverApi);

export { bookingApi, userApi, driverApi };
