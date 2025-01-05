// src/components/NavigationBar.tsx
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Button } from "./ui/button";
import { toggleTheme } from "@/store/theme/slice";
import useAuth from "@/hooks/use-auth";
import { useGetCurrentUserQuery } from "@/services/authApi";

export const NavigationBar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const { isAuthenticated } = useAuth();

  // const [logout] = useLogoutMutation();
  const { data: userData } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  console.log(userData);

  // const handleLogout = async () => {
  //   try {
  //     await logout().unwrap();
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-semibold text-lg">
            Ürün Yönetimi
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/">Ürünler</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/categories">Kategoriler</Link>
                </Button>
                <Button asChild>
                  <Link to="/add">Yeni Ürün Ekle</Link>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
