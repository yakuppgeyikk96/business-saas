import { ProductForm } from "./components/ProductForm";
import { useProductForm } from "./hooks/useProductForm";

const AddProductPage = () => {
  const { form, isLoading, categories, onSubmit } = useProductForm();

  return (
    <div className="max-w-2xl mx-auto">
      <ProductForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        categories={categories}
      />
    </div>
  );
};

export default AddProductPage;
