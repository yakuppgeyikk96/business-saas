export interface LoginRequest {
  email: string;
  password: string;
  websiteType: "business" | "ecommerce";
}
