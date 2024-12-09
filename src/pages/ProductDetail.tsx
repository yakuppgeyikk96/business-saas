// src/pages/ProductDetail.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "../schemas/productSchema";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../services/productApi";
import { useGetCategoriesQuery } from "../services/categoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { data: product, isLoading } = useGetProductQuery(id!);
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    values: product, // mevcut değerleri form'a set et
  });

  const onSubmit = async (data: ProductFormData) => {
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

  if (isLoading) return <div>Yükleniyor...</div>;
  if (!product) return <div>Ürün bulunamadı</div>;

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ürün Düzenle</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ürün Adı</label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fiyat</label>
              <Input type="number" {...register("price")} />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama</label>
              <Input {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stok</label>
              <Input type="number" {...register("stock")} />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{product.title}</CardTitle>
        <div className="flex gap-2">
          <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Sil</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu işlem geri alınamaz. Ürünü silmek istediğinizden emin
                  misiniz?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Evet, Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Fiyat</h3>
            <p>${product.price}</p>
          </div>
          <div>
            <h3 className="font-semibold">Stok</h3>
            <p>{product.stock}</p>
          </div>
          <div>
            <h3 className="font-semibold">Kategori</h3>
            <p>{product.category}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Açıklama</h3>
          <p>{product.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
