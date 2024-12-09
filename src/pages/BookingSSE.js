import React, { useEffect, useState } from 'react';

const BookingSSE = () => {
  const [messages, setMessages] = useState([]);  // Store received messages
  const [error, setError] = useState(null);      // Store any connection error

  console.log("messages",messages)
  console.log("error",error)
  useEffect(() => {
    // Initialize EventSource to connect to the backend SSE endpoint
    const eventSource = new EventSource('https://uat.hrisasia.com/booking-service/api/booking/createWithSSE');

    // Listen for 'message' events from the server
    eventSource.onmessage = (event) => {
      console.log('Received event:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle error events (e.g., connection failure)
    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      setError('Error connecting to server');
      eventSource.close();  // Close the connection on error
    };

    // Cleanup the connection when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Booking Progress</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingSSE;
