// src/components/ProductCard.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const navigate = useNavigate();

  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-muted-foreground">
                Kategori: {product.category}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="font-semibold">${product.price}</p>
                <p className="text-sm text-muted-foreground">
                  Stok: {product.stock}
                </p>
              </div>
              <Button onClick={() => navigate(`/product/${product.id}`)}>
                Detayları Gör
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-sm text-muted-foreground">
              Kategori: {product.category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground">
                Stok: {product.stock}
              </p>
            </div>
            <Button onClick={() => navigate(`/product/${product.id}`)}>
              Detayları Gör
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
