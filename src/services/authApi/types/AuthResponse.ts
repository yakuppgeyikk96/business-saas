import ApiResponse from "@/services/types/ApiResponse";
import { User } from "@/types/user";

interface AuthResponseData {
  user: Omit<User, "password">;
  token: string;
}

export type AuthResponse = ApiResponse<AuthResponseData>;
