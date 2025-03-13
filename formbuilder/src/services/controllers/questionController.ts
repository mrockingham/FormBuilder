// src/controllers/questionController.ts
import {
  getQuestionsAPI,
  createQuestionAPI,
  updateQuestionAPI,
  deleteQuestionAPI,
  Question,
  CreateQuestionPayload,
} from "../api/questions";

export const getQuestions = async (): Promise<Question[]> => {
  const data = await getQuestionsAPI();
  return data.questions;
};

export const addQuestion = async (
  payload: CreateQuestionPayload
): Promise<Question> => {
  return await createQuestionAPI(payload);
};

export const modifyQuestion = async (
  id: number,
  payload: CreateQuestionPayload
): Promise<{ message: string }> => {
  return await updateQuestionAPI(id, payload);
};

export const removeQuestion = async (
  id: number
): Promise<{ message: string }> => {
  return await deleteQuestionAPI(id);
};
