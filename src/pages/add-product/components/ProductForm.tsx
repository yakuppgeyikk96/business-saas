// src/pages/add-product/components/ProductForm.tsx
import { ProductFormData } from "@/schemas/productSchema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CategorySelect } from "./CategorySelect";
import { useNavigate } from "react-router-dom";
import { Category } from "@/types/category";

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading: boolean;
  categories?: Category[];
}

export const ProductForm = ({
  form,
  onSubmit,
  isLoading,
  categories,
}: ProductFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Ürün Ekle</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ürün Adı</label>
            <Input {...register("title")} placeholder="Ürün adı giriniz" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fiyat</label>
            <Input
              {...register("price")}
              type="number"
              placeholder="Fiyat giriniz"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Açıklama</label>
            <Input
              {...register("description")}
              placeholder="Ürün açıklaması giriniz"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <CategorySelect
            control={form.control}
            categories={categories}
            error={errors.category?.message}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Stok</label>
            <Input
              {...register("stock")}
              type="number"
              placeholder="Stok miktarı giriniz"
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ekleniyor..." : "Ürün Ekle"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
