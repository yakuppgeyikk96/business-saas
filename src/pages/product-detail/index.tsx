import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductInfo } from "./components/ProductInfo";
import { ProductActions } from "./components/ProductActions";
import { ProductEditForm } from "./components/ProductEditForm";
import { useProductDetail } from "./hooks/useProductDetail";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailPage = () => {
  const {
    response,
    isLoading,
    isEditing,
    setIsEditing,
    handleUpdate,
    handleDelete,
  } = useProductDetail();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <Skeleton className="h-48 m-6" />
      </Card>
    );
  }

  if (!response || !response.data) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{response.data.title}</CardTitle>
        <ProductActions
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      </CardHeader>

      {isEditing ? (
        <ProductEditForm
          product={response.data}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProductInfo product={response.data} />
      )}
    </Card>
  );
};

export default ProductDetailPage;
