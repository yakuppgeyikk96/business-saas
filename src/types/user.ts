import UserType from "@/enums/UserType";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  userType: UserType;
}
