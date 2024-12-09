import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";

export type SortOption = {
  value: string;
  field: keyof Product;
  direction: "asc" | "desc";
};

interface ProductSortProps {
  onSortChange: (sort: SortOption) => void;
}

const ProductSort = ({ onSortChange }: ProductSortProps) => {
  const sortOptions: SortOption[] = [
    { value: "name-asc", field: "title", direction: "asc" },
    { value: "name-desc", field: "title", direction: "desc" },
    { value: "price-asc", field: "price", direction: "asc" },
    { value: "price-desc", field: "price", direction: "desc" },
    { value: "stock-asc", field: "stock", direction: "asc" },
    { value: "stock-desc", field: "stock", direction: "desc" },
  ];

  return (
    <Select
      onValueChange={(value) => {
        const option = sortOptions.find((opt) => opt.value === value);
        if (option) onSortChange(option);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sıralama" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">İsim (A-Z)</SelectItem>
        <SelectItem value="name-desc">İsim (Z-A)</SelectItem>
        <SelectItem value="price-asc">Fiyat (Artan)</SelectItem>
        <SelectItem value="price-desc">Fiyat (Azalan)</SelectItem>
        <SelectItem value="stock-asc">Stok (Artan)</SelectItem>
        <SelectItem value="stock-desc">Stok (Azalan)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProductSort;
