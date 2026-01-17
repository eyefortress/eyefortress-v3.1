
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <Skeleton className="w-full aspect-video" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/4 mt-2" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <div className="p-6 pt-0">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}
