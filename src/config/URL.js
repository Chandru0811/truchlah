import axios from "axios";

// Booking controller instance
const bookingApi = axios.create({
  // baseURL: "http://13.213.208.92:9084/booking-service/api/",
  baseURL: "https://trucklah.com/booking-service/api/",
});

// User controller instance
const userApi = axios.create({
  // baseURL: "http://13.213.208.92:9083/user-service/api/",
  baseURL: "https://trucklah.com/user-service/api/",
});

// Driver controller instance
const driverApi = axios.create({
  // baseURL: "http://13.213.208.92:9083/driver-service/api/",
  baseURL: "https://trucklah.com/driver-service/api/",
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

// Add interceptors to each instance
addAuthInterceptor(bookingApi);
addAuthInterceptor(userApi);
addAuthInterceptor(driverApi);

export { bookingApi, userApi ,driverApi};
