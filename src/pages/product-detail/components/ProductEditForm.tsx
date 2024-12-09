import { Product } from "@/types/product";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/services/categoryApi";

interface ProductEditFormProps {
  product: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export const ProductEditForm = ({
  product,
  onSubmit,
  onCancel,
}: ProductEditFormProps) => {
  const { data: categories } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
    },
  });

  return (
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
          <Input type="number" step="0.01" {...register("price")} />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Açıklama</label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
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
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Stok</label>
          <Input type="number" {...register("stock")} />
          {errors.stock && (
            <p className="text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </CardContent>
  );
};
