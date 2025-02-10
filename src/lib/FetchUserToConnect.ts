import axios from "axios";

interface User {
  _id: string;
  UserName: string;
  ParentName: string;
  Gender: string;
  ParentGender: string;
  ParentEmail: string;
  ParentMobileNumber?: number;
  DateOfBirth: string;
  Points: number;
  Location: string;
}

interface ApiResponse {
  success: boolean;
  code: number;
  user?: User | string;
  error?: any;
}

export const fetchUserById = async (_id: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>("/api/fethcUserToConnect", {
      _id,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
