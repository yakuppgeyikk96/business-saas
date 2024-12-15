import { Control, Controller } from "react-hook-form";
import { ProductFormData } from "@/schemas/productSchema";
import { Category } from "@/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  control: Control<ProductFormData>;
  categories?: Category[];
  error?: string;
}

export const CategorySelect = ({
  control,
  categories,
  error,
}: CategorySelectProps) => {
  return (
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
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
