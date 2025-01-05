import UserType from "@/enums/UserType";

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userType: UserType;
}
