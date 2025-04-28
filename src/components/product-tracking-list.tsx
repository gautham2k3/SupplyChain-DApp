import { getProducts } from "@/lib/actions";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageSearch } from "lucide-react"; // Import an appropriate icon

export async function ProductTrackingList() {
  // Fetch products server-side
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border border-dashed rounded-lg">
        <PackageSearch className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-semibold">No Products Found</h3>
        <p className="text-sm">Add a new product using the form to start tracking its supply chain journey.</p>
      </div>
    );
  }

  // Sort products perhaps by latest update or name? Example: Sort by name
  const sortedProducts = products.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    // Adjust height calculation based on your layout. This example tries to fill available space.
    <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(100vh-18rem)]">
        <div className="space-y-4 pr-4 pb-4"> {/* Add padding-right for scrollbar and padding-bottom */}
            {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </ScrollArea>
  );
}
