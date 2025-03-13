// src/api/questions.ts
import axiosInstance from "./axiosInstance";

export interface Question {
  question_id: number;
  question_text: string;
  question_type: string;
  options?: any; // Can be an array or object, depending on your schema
  // Additional columns such as validation fields, image_path, etc.
}

export interface CreateQuestionPayload {
  question_text: string;
  question_type: string;
  options?: any;
  // Add other fields as needed
}

export const getQuestionsAPI = async (): Promise<{ questions: Question[] }> => {
  try {
    const response = await axiosInstance.get<{ questions: Question[] }>(
      "/questions"
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const createQuestionAPI = async (
  payload: CreateQuestionPayload
): Promise<Question> => {
  try {
    const response = await axiosInstance.post<Question>("/questions", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const updateQuestionAPI = async (
  id: number,
  payload: CreateQuestionPayload
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put<{ message: string }>(
      `/questions/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const deleteQuestionAPI = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(
      `/questions/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
