// src/api/forms.ts
import axiosInstance from "./axiosInstance";
export interface FormData {
  title: string;
  form_data: any; // adjust type as needed
}

export interface FormResponse {
  id: number;
  title: string;
  form_data: any;
}

export const getFormsAPI = async (): Promise<{ forms: FormResponse[] }> => {
  try {
    const response = await axiosInstance.get<{ forms: FormResponse[] }>(
      "/forms"
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

export const createFormAPI = async (
  formData: FormData
): Promise<FormResponse> => {
  try {
    const response = await axiosInstance.post<FormResponse>("/forms", formData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
