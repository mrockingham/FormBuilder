// src/api/responses.ts
import axiosInstance from "./axiosInstance";

export interface ResponseData {
  response_id: number;
  submission_id: number;
  question_id: number;
  option_id?: number | null;
  value?: string | null;
}

export interface CreateResponsePayload {
  submission_id: number;
  question_id: number;
  option_id?: number | null;
  value?: string | null;
}

export const getResponsesAPI = async (): Promise<{
  responses: ResponseData[];
}> => {
  try {
    const response = await axiosInstance.get<{ responses: ResponseData[] }>(
      "/responses"
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const createResponseAPI = async (
  payload: CreateResponsePayload
): Promise<ResponseData> => {
  try {
    const response = await axiosInstance.post<ResponseData>(
      "/responses",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const updateResponseAPI = async (
  id: number,
  payload: CreateResponsePayload
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put<{ message: string }>(
      `/responses/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const deleteResponseAPI = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(
      `/responses/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
