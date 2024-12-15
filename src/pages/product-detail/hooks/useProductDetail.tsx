// src/pages/product-detail/hooks/useProductDetail.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/productApi";
import { ProductFormData } from "@/schemas/productSchema";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data: response, isLoading } = useGetProductQuery(id!);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleUpdate = async (formData: ProductFormData) => {
    try {
      await updateProduct({
        id: id!,
        data: {
          ...formData,
          category: formData.category,
        },
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id!).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return {
    response,
    isLoading,
    isEditing,
    setIsEditing,
    handleUpdate,
    handleDelete,
  };
};
