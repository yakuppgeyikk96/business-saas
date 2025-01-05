export default interface ProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  organizationId: string;
}
