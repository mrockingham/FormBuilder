import {
  getEventsAPI,
  createEventAPI,
  deleteEventAPI,
  updateEventAPI,
} from "../../services/api/event";

export const getEvents = async () => {
  const response = await getEventsAPI();
  return response.events;
};

export const addEvent = async (event: any) => {
  console.log("event", event);
  const eventInfo = {
    title: event.title,
    event_data: { ...event },
  };
  const response = await createEventAPI(eventInfo);
  return response;
};

export const updateEvent = async (id: number, event: any) => {
  const response = await updateEventAPI(id, event);
  return response;
};

export const deleteEvent = async (id: number) => {
  const response = await deleteEventAPI(id);
  return response;
};
