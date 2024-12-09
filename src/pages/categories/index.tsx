// src/pages/categories/index.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddCategoryForm } from "./components/AddCategoryForm";
import { CategoryList } from "./components/CategoryList";
import { useCategories } from "./hooks/useCategories";

const CategoriesPage = () => {
  const {
    categories,
    isLoading,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleDeleteCategory,
  } = useCategories();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kategoriler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddCategoryForm
          value={newCategory}
          onChange={setNewCategory}
          onSubmit={handleAddCategory}
        />

        <CategoryList
          categories={categories}
          isLoading={isLoading}
          onDelete={handleDeleteCategory}
        />
      </CardContent>
    </Card>
  );
};

export default CategoriesPage;
