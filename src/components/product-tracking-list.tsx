"use client"; // Mark as client component

import { useProducts } from "@/context/product-context"; // Import useProducts hook
import { ProductCard } from "./product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageSearch, Loader2 } from "lucide-react"; // Import Loader2 for loading state

export function ProductTrackingList() {
  // Fetch products and loading state from context client-side
  const { products, isLoading } = useProducts();

   if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
        <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
        <h3 className="text-lg font-semibold">Loading Products...</h3>
        <p className="text-sm">Fetching supply chain data.</p>
      </div>
    );
  }


  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border border-dashed rounded-lg">
        <PackageSearch className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-semibold">No Products Found</h3>
        <p className="text-sm">Add a new product using the form to start tracking its supply chain journey.</p>
      </div>
    );
  }

  // Sort products - Example: Sort by latest update (most recent first)
  const sortedProducts = products.slice().sort((a, b) => {
     const lastEventA = a.trackingHistory[a.trackingHistory.length - 1]?.date;
     const lastEventB = b.trackingHistory[b.trackingHistory.length - 1]?.date;

     if (!lastEventA && !lastEventB) return a.name.localeCompare(b.name); // Sort by name if no events
     if (!lastEventA) return 1; // Products without history go last
     if (!lastEventB) return -1; // Products without history go last

     return new Date(lastEventB).getTime() - new Date(lastEventA).getTime(); // Sort by date descending
  });


  return (
    // Rely on parent flex-grow.
    <ScrollArea className="h-full">
        <div className="space-y-4 pr-4 pb-4"> {/* Add padding-right for scrollbar and padding-bottom */}
            {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </ScrollArea>
  );
}
