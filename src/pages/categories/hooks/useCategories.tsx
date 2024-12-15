import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "@/services/categoryApi";

export const useCategories = () => {
  const [newCategory, setNewCategory] = useState("");

  const { data: categoriesResponse, isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addCategory({ name: newCategory.trim() }).unwrap();
        setNewCategory("");
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
    categories: categoriesResponse?.data || [],
    isLoading,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleDeleteCategory,
  };
};
