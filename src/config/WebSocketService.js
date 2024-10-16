import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    // this.socket = new SockJS("https://uat.hrisasia.com/booking-service/ws");
    // this.socket = new SockJS("https://trucklah.com/booking-service/ws");
    // this.socket = new SockJS("http://13.213.208.92:9084/booking-service/ws");
    // UAT
    this.socket = new SockJS("http://52.74.83.44:7080/booking-service/ws");
    this.stompClient = Stomp.over(this.socket);
    // this.stompClient.debug = false;
    this.connected = false;
    this.connect(() => {
      this.connected = true;
    });
  }

  connect(callback) {
    this.stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
      if (callback) {
        callback();
      }
    });
  }

  subscribeToBookingUpdates(callback) {
    if (!this.connected) {
      console.error("STOMP connection not established");
      return;
    }
    this.stompClient.subscribe("/topic/booking", (response) => {
      console.log(response);
      callback(JSON.parse(response.body));
    });
  }

  newData(message) {
    if (!this.connected) {
      console.error("STOMP connection not established");
      return;
    }
    this.stompClient.send("/app/newData", {}, JSON.stringify(message));
  }
}

export default new WebSocketService();
