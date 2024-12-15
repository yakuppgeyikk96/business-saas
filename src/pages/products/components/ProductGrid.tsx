// src/pages/products/components/ProductGrid.tsx
import ProductCard from "@/pages/products/components/ProductCard";
import ProductCardSkeleton from "@/pages/products/components/ProductCardSkeleton";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products?: Product[];
  isGridView: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const ProductGrid = ({
  products,
  isGridView,
  isLoading,
  isFetching,
}: ProductGridProps) => {
  if (isLoading || isFetching) {
    return (
      <div
        className={
          isGridView
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid grid-cols-1 gap-4"
        }
      >
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <ProductCardSkeleton
              key={index}
              viewMode={isGridView ? "grid" : "list"}
            />
          ))}
      </div>
    );
  }

  return (
    <div
      data-testid="product-grid"
      className={
        isGridView
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "grid grid-cols-1 gap-4"
      }
    >
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          viewMode={isGridView ? "grid" : "list"}
        />
      ))}
    </div>
  );
};
