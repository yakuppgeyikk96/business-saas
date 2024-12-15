import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { useAddProductMutation } from "@/services/productApi";
import { useGetCategoriesQuery } from "@/services/categoryApi";

export const useProductForm = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: categoriesResponse } = useGetCategoriesQuery();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await addProduct(data).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return {
    form,
    isLoading,
    categories: categoriesResponse?.data || [],
    onSubmit,
  };
};
