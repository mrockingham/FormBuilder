import axiosInstance from "./axiosInstance";

export interface FormData {
  title: any;
  form_data: any; // adjust type as needed, e.g. a JSON object
}

export interface FormResponse {
  id: number;
  title: string;
  form_data: any;
}

// GET /forms - retrieve all forms
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

// POST /forms - create a new form
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

// PUT /forms/:id - update an existing form
export const updateFormAPI = async (
  id: number,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put<{ message: string }>(
      `/forms/${id}`,
      formData
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};

// DELETE /forms/:id - delete a form
export const deleteFormAPI = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(
      `/forms/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
