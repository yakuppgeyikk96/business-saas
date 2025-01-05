import UserType from "@/enums/UserType";
import { RegisterFormData, registerSchema } from "@/schemas/authSchema";
import { useRegisterMutation } from "@/services/authApi";
import { RegisterRequest } from "@/services/authApi/types/RegisterRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useRegisterForm = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const registerRequest: RegisterRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      userType: UserType.BUSINESS,
    };

    try {
      await register(registerRequest).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};

export default useRegisterForm;
