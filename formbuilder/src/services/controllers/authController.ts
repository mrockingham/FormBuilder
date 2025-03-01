// src/controllers/authController.ts
import {
  loginAPI,
  getUserAPI,
  LoginResponse,
  GetUserResponse,
} from "../api/auth";
import useUserStore from "../../stores/userStore";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await loginAPI(email, password);
    const { setUser } = useUserStore.getState();

    setUser(response.user);
    return response;
  } catch (error: any) {
    // If error.response exists, throw its data, otherwise throw a new Error.
    throw error.response?.data || new Error("Network error");
  }

  const data = await loginAPI(email, password);
  // You can add extra business logic here if needed.
  return await loginAPI(email, password);
};

export const fetchUser = async (token: string): Promise<GetUserResponse> => {
  return await getUserAPI(token);
};
