import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "../../../services/categoryApi";

interface FilterProps {
  onFilterChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

const ProductFilters = ({ onFilterChange }: FilterProps) => {
  const { data: response } = useGetCategoriesQuery();

  const [tempFilters, setTempFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleApplyFilters = () => {
    onFilterChange({
      category:
        tempFilters.category === "all" ? undefined : tempFilters.category,
      minPrice: tempFilters.minPrice ? Number(tempFilters.minPrice) : undefined,
      maxPrice: tempFilters.maxPrice ? Number(tempFilters.maxPrice) : undefined,
    });
  };

  const handleClearFilters = () => {
    setTempFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    onFilterChange({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtreler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select
            value={tempFilters.category}
            onValueChange={(value) =>
              setTempFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              {response?.data?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fiyat Aralığı</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={tempFilters.minPrice}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={tempFilters.maxPrice}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleApplyFilters}>Filtreleri Uygula</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Filtreleri Temizle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
