import { LoginFormData, loginSchema } from "@/schemas/authSchema";
import { useLoginMutation } from "@/services/authApi";
import { LoginRequest } from "@/services/authApi/types/LoginRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password,
      websiteType: "business",
    };

    try {
      await login(loginRequest).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};

export default useLoginForm;
