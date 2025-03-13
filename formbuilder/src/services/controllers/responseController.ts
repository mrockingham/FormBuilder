// src/controllers/responseController.ts
import {
  getResponsesAPI,
  createResponseAPI,
  updateResponseAPI,
  deleteResponseAPI,
  ResponseData,
  CreateResponsePayload,
} from "../api/responses";

export const fetchResponses = async (): Promise<ResponseData[]> => {
  const data = await getResponsesAPI();
  return data.responses;
};

export const addResponse = async (
  payload: CreateResponsePayload
): Promise<ResponseData> => {
  return await createResponseAPI(payload);
};

export const modifyResponse = async (
  id: number,
  payload: CreateResponsePayload
): Promise<{ message: string }> => {
  return await updateResponseAPI(id, payload);
};

export const removeResponse = async (
  id: number
): Promise<{ message: string }> => {
  return await deleteResponseAPI(id);
};
