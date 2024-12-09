import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "@/services/categoryApi";

export const useCategories = () => {
  const [newCategory, setNewCategory] = useState("");

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addCategory({ name: newCategory.trim() }).unwrap();
        setNewCategory(""); // başarılı ekleme sonrası formu temizle
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return {
    categories,
    isLoading,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleDeleteCategory,
  };
};
