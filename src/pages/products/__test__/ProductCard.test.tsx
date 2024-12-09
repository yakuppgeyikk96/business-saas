import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "Test Description",
  category: "electronics",
  stock: 10,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProductCard", () => {
  it("should render product information correctly", () => {
    renderWithRouter(<ProductCard product={mockProduct} viewMode="grid" />);

    // Check the title
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check the price
    expect(screen.getByText("$99.99")).toBeInTheDocument();

    // Check the stock
    expect(screen.getByText("Stok: 10")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /detayları gör/i })
    ).toBeInTheDocument();
  });

  it("renders in list mode correctly", () => {
    renderWithRouter(<ProductCard product={mockProduct} viewMode="list" />);

    // List mode'da farklı bir layout kontrolü yapılabilir
    // Örneğin spesifik class'ların varlığı kontrol edilebilir
  });

  it("renders in different view modes", () => {
    // Grid Mode
    const { rerender } = renderWithRouter(
      <ProductCard product={mockProduct} viewMode="grid" />
    );

    // Grid mode'da card içeriğinin varlığını kontrol et
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // List Mode
    rerender(
      <BrowserRouter>
        <ProductCard product={mockProduct} viewMode="list" />
      </BrowserRouter>
    );

    // List mode'da da aynı içeriğin varlığını kontrol et
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});
