// src/components/NavigationBar.tsx
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { RootState } from "../store";
import { Button } from "./ui/button";

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

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
            <Button variant="outline" asChild>
              <Link to="/">Ürünler</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/categories">Kategoriler</Link>
            </Button>
            <Button asChild>
              <Link to="/add">Yeni Ürün Ekle</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
