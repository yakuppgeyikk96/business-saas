import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://business-saas-api.onrender.com/api",
  }),
  tagTypes: ["Product", "Category"],
  endpoints: () => ({}),
});
