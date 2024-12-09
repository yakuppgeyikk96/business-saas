// src/pages/product-detail/hooks/useProductDetail.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/productApi";
import { Product } from "@/types/product";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data: product, isLoading } = useGetProductQuery(id!);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleUpdate = async (data: Partial<Product>) => {
    try {
      await updateProduct({ id: id!, data }).unwrap();
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
    product,
    isLoading,
    isEditing,
    setIsEditing,
    handleUpdate,
    handleDelete,
  };
};
