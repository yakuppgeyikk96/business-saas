import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LayoutGrid, List, Download } from "lucide-react";
import ProductSort from "@/pages/products/components/ProductSort";
import type { SortOption } from "@/pages/products/components/ProductSort";

interface ProductHeaderProps {
  totalCount: number;
  isGridView: boolean;
  setIsGridView: (isGrid: boolean) => void;
  onSortChange: (sort: SortOption) => void;
}

export const ProductHeader = ({
  totalCount,
  isGridView,
  setIsGridView,
  onSortChange,
}: ProductHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Ürün Yönetimi</CardTitle>
              <CardDescription>
                Toplam {totalCount} ürün listeleniyor
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <ProductSort onSortChange={onSortChange} />
              <Button
                variant="outline"
                onClick={() => setIsGridView(!isGridView)}
              >
                {isGridView ? <List size={20} /> : <LayoutGrid size={20} />}
              </Button>
              <Button variant="outline">
                <Download size={20} className="mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
