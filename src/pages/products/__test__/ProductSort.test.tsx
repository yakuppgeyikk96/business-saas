import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductSort, { SortOption } from "../components/ProductSort";

describe("ProductSort", () => {
  const mockOnSortChange = vi.fn();

  const sortOptions: SortOption[] = [
    { value: "name-asc", field: "title", direction: "asc" },
    { value: "name-desc", field: "title", direction: "desc" },
    { value: "price-asc", field: "price", direction: "asc" },
    { value: "price-desc", field: "price", direction: "desc" },
    { value: "stock-asc", field: "stock", direction: "asc" },
    { value: "stock-desc", field: "stock", direction: "desc" },
  ];

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  it("should render correctly", async () => {
    render(<ProductSort onSortChange={mockOnSortChange} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Sıralama")).toBeInTheDocument();
  });

  it("renders all sort options", () => {
    render(<ProductSort onSortChange={vi.fn()} />);

    fireEvent.click(screen.getByText("Sıralama"));

    expect(screen.getByText("İsim (A-Z)")).toBeInTheDocument();
    expect(screen.getByText("İsim (Z-A)")).toBeInTheDocument();
    expect(screen.getByText("Fiyat (Artan)")).toBeInTheDocument();
    expect(screen.getByText("Fiyat (Azalan)")).toBeInTheDocument();
    expect(screen.getByText("Stok (Artan)")).toBeInTheDocument();
    expect(screen.getByText("Stok (Azalan)")).toBeInTheDocument();
  });

  it("should call onSortChange with correct option for each sort option", async () => {
    render(<ProductSort onSortChange={mockOnSortChange} />);

    const selectEl = screen.getByText("Sıralama");

    sortOptions.forEach((option) => {
      fireEvent.click(selectEl);

      const item = screen.getByText(getOptionLabel(option.value));

      // Click the option
      fireEvent.click(item);

      // Check if the correct value was passed
      expect(mockOnSortChange).toHaveBeenCalledWith(option);

      // Reset the mock for the next iteration
      mockOnSortChange.mockReset();
    });
  });
});

function getOptionLabel(value: string): string {
  switch (value) {
    case "name-asc":
      return "İsim (A-Z)";
    case "name-desc":
      return "İsim (Z-A)";
    case "price-asc":
      return "Fiyat (Artan)";
    case "price-desc":
      return "Fiyat (Azalan)";
    case "stock-asc":
      return "Stok (Artan)";
    case "stock-desc":
      return "Stok (Azalan)";
    default:
      return "";
  }
}
