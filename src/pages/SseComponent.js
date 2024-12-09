import React, { useEffect, useState } from 'react';

const SseComponent = () => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState({});
console.log("count",count)
  useEffect(() => {
    console.log("object 1")
    const eventSource = new EventSource('http://localhost:8080/api/events');
    console.log("object 2",eventSource)
    eventSource.addEventListener('user-created', function(event) {
      const newData = event.data;
      console.log("object 2")
      setEvents(prevEvents => [...prevEvents, newData]);
      console.log("event.data.id",newData)
      setCount(newData)
    });

    // Cleanup when component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Server-Sent Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default SseComponent;
