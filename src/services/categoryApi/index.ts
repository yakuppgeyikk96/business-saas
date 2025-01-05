import { Category } from "../../types/category";
import { baseApi } from "../baseApi";
import ApiResponse from "../types/ApiResponse";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<ApiResponse<Category>, Omit<Category, "_id">>(
      {
        query: (category) => ({
          url: "business/categories",
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }
    ),
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `business/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
