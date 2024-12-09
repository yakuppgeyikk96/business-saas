import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/product";
import { baseApi } from "./baseApi";

interface GetProductsQuery {
  _start?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  title_like?: string;
  category?: string;
  price_gte?: number;
  price_lte?: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsQuery>({
      query: (params) => ({
        url: "products",
        params,
      }),
      providesTags: ["Product"],
    }),
    getTotalProducts: builder.query<number, void>({
      query: () => "/products",
      transformResponse: (response: Product[]) => response.length,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      async queryFn(product, _api, _extraOptions, baseQuery) {
        try {
          const productsResult = await baseQuery("/products");
          if (productsResult.error) throw productsResult.error;

          const products = productsResult.data as Product[];
          const lastId = Math.max(...products.map((p) => Number(p.id) || 0));

          // Yeni ürünü ekle
          const result = await baseQuery({
            url: "/products",
            method: "POST",
            body: {
              ...product,
              id: String(lastId + 1),
            },
          });

          if (result.error) throw result.error;
          return { data: result.data as Product };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTotalProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
