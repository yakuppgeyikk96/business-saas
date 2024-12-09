import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - Math.floor(maxVisiblePages / 2);
    let end = currentPage + Math.floor(maxVisiblePages / 2);

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (showEllipsis) {
      if (start > 1) {
        pages.unshift(1);
        if (start > 2) pages.splice(1, 0, -1);
      }
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {getVisiblePages().map((pageNumber, idx) => (
          <PaginationItem key={idx}>
            {pageNumber === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};
