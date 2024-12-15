import { Category } from "@/types/category";
import { CategoryItem } from "./CategoryItem";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryListProps {
  categories?: Category[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
}

export const CategoryList = ({
  categories,
  isLoading,
  onDelete,
}: CategoryListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Henüz kategori bulunmuyor.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {categories.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
