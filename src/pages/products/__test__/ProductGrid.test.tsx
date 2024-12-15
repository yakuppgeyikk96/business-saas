import { Product } from "@/types/product";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductGrid } from "../components/ProductGrid";
import { BrowserRouter } from "react-router-dom";

const mockProducts: Product[] = [
  {
    _id: 1,
    title: "Test Product 1",
    price: 99.99,
    description: "Test Description 1",
    category: {
      _id: "1",
      name: "Test Category",
    },
    stock: 10,
  },
  {
    _id: 2,
    title: "Test Product 2",
    price: 149.99,
    description: "Test Description 2",
    category: {
      _id: "2",
      name: "Test Category 2",
    },
    stock: 5,
  },
];

describe("ProductGrid", () => {
  const renderProductGrid = (props: {
    products?: Product[];
    isGridView: boolean;
    isLoading: boolean;
    isFetching: boolean;
  }) => {
    return render(
      <BrowserRouter>
        <ProductGrid {...props} />
      </BrowserRouter>
    );
  };

  it("should render loading skeleton when loading", async () => {
    renderProductGrid({
      products: undefined,
      isGridView: true,
      isLoading: true,
      isFetching: false,
    });

    const skeletons = screen.getAllByTestId("product-card-skeleton");
    expect(skeletons).toHaveLength(6);
  });

  it("renders products in grid view", () => {
    renderProductGrid({
      products: mockProducts,
      isGridView: true,
      isLoading: false,
      isFetching: false,
    });

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    const gridContainer = screen.getByTestId("product-grid");
    expect(gridContainer).toHaveClass(
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    );
  });

  it("renders products in list view", () => {
    renderProductGrid({
      products: mockProducts,
      isGridView: false,
      isLoading: false,
      isFetching: false,
    });

    const listContainer = screen.getByTestId("product-grid");
    expect(listContainer).toHaveClass("grid-cols-1");
  });

  it("shows loading state while fetching", () => {
    renderProductGrid({
      products: mockProducts,
      isGridView: true,
      isLoading: false,
      isFetching: true,
    });

    const skeletons = screen.getAllByTestId("product-card-skeleton");
    expect(skeletons).toHaveLength(6);
  });
});
