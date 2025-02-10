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
  status: number;
  users?: User[];
  message?: string;
  error?: string;
}

export const FetchUsersByLocation = async (
  Location: string,
  UserName: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      "/api/fetchUsersByLocation",
      { Location, UserName }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Failed to fetch users",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
