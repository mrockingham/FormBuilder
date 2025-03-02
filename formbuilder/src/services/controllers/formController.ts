// src/controllers/formController.ts
import {
  getFormsAPI,
  createFormAPI,
  updateFormAPI,
  deleteFormAPI,
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

export const updateForm = async (
  id: number,
  formData: FormData
): Promise<{ message: string }> => {
  return await updateFormAPI(id, formData);
};

export const deleteForm = async (id: number): Promise<{ message: string }> => {
  return await deleteFormAPI(id);
};
