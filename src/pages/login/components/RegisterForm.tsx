import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData } from "@/schemas/authSchema";
import { UseFormReturn } from "react-hook-form";

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

const RegisterForm = ({ form, onSubmit, isLoading }: RegisterFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Ad Soyad"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="E-posta"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Şifre"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Kayıt olunuyor..." : "Kayıt Ol"}
      </Button>
    </form>
  );
};

export default RegisterForm;
