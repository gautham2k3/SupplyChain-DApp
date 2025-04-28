import { AddProductForm } from '@/components/add-product-form';
import { ProductTrackingList } from '@/components/product-tracking-list';
import { SupplyChainVisualization } from '@/components/supply-chain-visualization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"> {/* Ensure grid takes full height */}
      {/* Left Column */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        {/* Updated Card to have flex-grow and flex-col */}
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Enter details to track a new product.</CardDescription>
          </CardHeader>
          {/* Updated CardContent to also be a flex container */}
          <CardContent className="flex-grow flex flex-col">
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
      <div className="lg:col-span-2 flex flex-col"> {/* Ensure right column is also flex */}
        <Card className="h-full flex flex-col flex-grow"> {/* Ensure card takes full height and grows */}
          <CardHeader>
            <CardTitle>Product Tracking</CardTitle>
            <CardDescription>View the current status and history of your products.</CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          {/* Ensure CardContent grows and allows scrolling */}
          <CardContent className="flex-grow overflow-hidden flex flex-col">
            <ProductTrackingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
