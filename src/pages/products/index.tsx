import { ProductHeader } from "./components/ProductHeader";
import { ProductGrid } from "./components/ProductGrid";
import { ProductPagination } from "./components/ProductPagination";
import { useProducts } from "./hooks/useProducts";
import ProductFilters from "@/pages/products/components/ProductFilters";
import NotFound from "@/components/NotFound";

const ProductsPage = () => {
  const {
    products,
    isLoading,
    isFetching,
    isGridView,
    setIsGridView,
    currentPage,
    setCurrentPage,
    handleFilterChange,
    totalPages,
    totalCount,
    handleSortChange,
  } = useProducts();

  return (
    <div className="space-y-6">
      <ProductHeader
        totalCount={totalCount}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        onSortChange={handleSortChange}
      />

      <div className="flex gap-6">
        <div className="w-80">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="flex-1 space-y-6">
          {products && products.length > 0 ? (
            <>
              <ProductGrid
                products={products}
                isGridView={isGridView}
                isLoading={isLoading}
                isFetching={isFetching}
              />

              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <NotFound
              title="Ürün bulunamadı"
              message=""
              showBackButton={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
