import axiosInstance from "./axiosInstance";

export interface Event {
  title: "string";
  data: {
    start_date: "string";
    end_date: "string";
    location: "string";
    background_color: "string";
    primary_color: "string";
    campaign_code: "string";
    event_type_id: "string";
    active: "string";
  };
}

export const getEventsAPI = async (): Promise<Event[]> => {
  try {
    const response = await axiosInstance.get<Event[]>("/events");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const createEventAPI = async (event: Event): Promise<Event> => {
  try {
    const response = await axiosInstance.post<Event>("/events", event);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const updateEventAPI = async (
  id: number,
  event: Event
): Promise<Event> => {
  try {
    const response = await axiosInstance.put<Event>(`/events/${id}`, event);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const deleteEventAPI = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(
      `/events/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
