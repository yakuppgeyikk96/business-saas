// src/pages/products/hooks/useProducts.tsx
import { useState } from "react";
import { useGetProductsQuery } from "@/services/productApi";
import type { SortOption } from "@/pages/products/components/ProductSort";

interface Filters {
  category: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export const useProducts = () => {
  const itemsPerPage = 9;
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [sort, setSort] = useState<{
    field: string;
    order: "asc" | "desc";
  } | null>(null);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
    sortField: sort?.field,
    sortOrder: sort?.order,
    category: filters.category || undefined,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const totalCount = response?.metadata.total || 0;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSortChange = (sortOption: SortOption) => {
    setSort({
      field: sortOption.field,
      order: sortOption.direction,
    });
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  return {
    products: response?.data,
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
    itemsPerPage,
  };
};
