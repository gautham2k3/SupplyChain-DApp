import { AddProductForm } from '@/components/add-product-form';
import { ProductTrackingList } from '@/components/product-tracking-list';
import { SupplyChainVisualization } from '@/components/supply-chain-visualization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Enter details to track a new product.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <AddProductForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Stages</CardTitle>
            <CardDescription>Typical stages in the supply chain.</CardDescription>
          </CardHeader>
          <CardContent>
            <SupplyChainVisualization />
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col"> {/* Ensure card takes full height potentially */}
          <CardHeader>
            <CardTitle>Product Tracking</CardTitle>
            <CardDescription>View the current status and history of your products.</CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent className="flex-grow overflow-hidden"> {/* Allow content to grow and handle overflow */}
            <ProductTrackingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
