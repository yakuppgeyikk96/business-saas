import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:3001/products");

    if (!response.ok) {
      throw new Error("Ürünler yüklenirken bir hata oluştu");
    }

    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Ürün eklenirken bir hata oluştu");
    }

    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ürün eklenirken bir hata oluştu";
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
