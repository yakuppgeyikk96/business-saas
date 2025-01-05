import { useAppSelector } from "@/store";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import { useNavigate } from "react-router-dom";
import useLoginForm from "./hooks/use-login-form";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoginForm from "./components/LoginForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RegisterForm from "./components/RegisterForm";
import useRegisterForm from "./hooks/use-register-form";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  console.log(isAuthenticated);

  const {
    form: loginForm,
    isLoading: isLoginLoading,
    onSubmit: onLoginSubmit,
  } = useLoginForm();

  const {
    form: registerForm,
    isLoading: isRegisterLoading,
    onSubmit: onRegisterSubmit,
  } = useRegisterForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Hoş Geldiniz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0">
              <LoginForm
                form={loginForm}
                onSubmit={onLoginSubmit}
                isLoading={isLoginLoading}
              />
            </TabsContent>
            <TabsContent value="register" className="mt-0">
              <RegisterForm
                form={registerForm}
                onSubmit={onRegisterSubmit}
                isLoading={isRegisterLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
