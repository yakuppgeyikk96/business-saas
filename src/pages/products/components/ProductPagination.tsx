import { Pagination } from "@/components/common/pagination";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) => {
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
