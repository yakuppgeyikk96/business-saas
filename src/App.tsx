import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { ThemeProvider } from "./providers/ThemeProvider";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const ProductsPage = lazy(() => import("./pages/products"));
const AddProductPage = lazy(() => import("./pages/add-product"));
const ProductDetailPage = lazy(() => import("./pages/product-detail"));
const CategoriesPage = lazy(() => import("./pages/categories"));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <NavigationBar />
          <main className="container mx-auto p-4">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/add" element={<AddProductPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
