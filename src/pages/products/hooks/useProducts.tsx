// src/pages/products/hooks/useProducts.tsx
import { useState } from "react";
import {
  useGetProductsQuery,
  useGetTotalProductsQuery,
} from "@/services/productApi";
import type { SortOption } from "@/pages/products/components/ProductSort";

interface Filters {
  category: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export const useProducts = () => {
  const itemsPerPage = 6;
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

  // data'yı products olarak yeniden adlandır
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    _start: (currentPage - 1) * itemsPerPage,
    _limit: itemsPerPage,
    _sort: sort?.field,
    _order: sort?.order,
    category: filters.category || undefined,
    price_gte: filters.minPrice,
    price_lte: filters.maxPrice,
  });

  const { data: totalCount = 0 } = useGetTotalProductsQuery();

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
    products, // data.products ya da sadece data olarak döndürmeye dikkat et
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
