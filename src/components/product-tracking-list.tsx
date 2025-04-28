import { getProducts } from "@/lib/actions";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function ProductTrackingList() {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No products added yet. Add a product to start tracking.</p>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
        <div className="space-y-4 pr-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </ScrollArea>
  );
}
