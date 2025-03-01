// src/controllers/formController.ts
import {
  getFormsAPI,
  createFormAPI,
  FormResponse,
  FormData,
} from "../api/forms";

export const fetchForms = async (): Promise<FormResponse[]> => {
  const data = await getFormsAPI();
  return data.forms;
};

export const addForm = async (formData: FormData): Promise<FormResponse> => {
  return await createFormAPI(formData);
};
