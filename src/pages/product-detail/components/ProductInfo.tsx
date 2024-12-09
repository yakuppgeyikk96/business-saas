import { Product } from "@/types/product";
import { CardContent } from "@/components/ui/card";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
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
  );
};
