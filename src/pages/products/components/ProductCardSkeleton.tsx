import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardSkeletonProps {
  viewMode: "grid" | "list";
}

const ProductCardSkeleton = ({ viewMode }: ProductCardSkeletonProps) => {
  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
