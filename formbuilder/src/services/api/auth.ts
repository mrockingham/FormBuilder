// src/api/auth.ts
import axiosInstance from "./axiosInstance";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

export const loginAPI = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    // If error.response exists, throw its data, otherwise throw a new Error.
    throw error.response?.data || new Error("Network error");
  }
};

export interface GetUserResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

export const getUserAPI = async (token: string): Promise<GetUserResponse> => {
  try {
    const response = await axiosInstance.get<GetUserResponse>("/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Network error");
  }
};
