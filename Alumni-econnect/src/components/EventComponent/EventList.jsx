import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { eventService } from '../../services/eventService';
import { FaStar, FaRegLightbulb } from 'react-icons/fa'; // Import icons

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getallevents();
        if (response.success) {
          setEvents(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (events.length === 0) {
    return <p className="text-gray-600 text-center">No events available at the moment.</p>;
  }

  return (
    <div className="container mx-auto p-4 mb-10">
      <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center">
        <FaStar className="mr-2 text-[#d27511]" />
        Explore Exciting Events!
      </h2>
      <p className="text-center text-gray-700 text-lg mb-4 flex items-center justify-center ">
        Join us for unforgettable experiences and connections.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
