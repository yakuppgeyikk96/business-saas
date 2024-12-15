export default interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  metadata: {
    page: number;
    limit: number;
    total: number;
  };
}
