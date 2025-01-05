import { Product } from "../../types/product";
import { baseApi } from "../baseApi";
import ApiResponse from "../types/ApiResponse";
import AddProductData from "./types/AddProductData";
import { GetProductsResponse } from "./types/GetProductsResponse";
import ProductsQueryParams from "./types/ProductsQueryParams";
import UpdateProductData from "./types/UpdateProductData";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, ProductsQueryParams>({
      query: (params) => ({
        url: "business/products",
        params,
      }),
      providesTags: ["Product"],
    }),

    getProduct: builder.query<ApiResponse<Product>, string>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    addProduct: builder.mutation<ApiResponse<Product>, AddProductData>({
      query: (product) => ({
        url: "business/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      ApiResponse<Product>,
      { id: string; data: UpdateProductData }
    >({
      query: ({ id, data }) => ({
        url: `business/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `business/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
