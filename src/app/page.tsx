"use client"; // Mark page as client component

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
        {/* Card: Add New Product */}
        {/* Ensure this card grows vertically to fill space, especially the form inside */}
         <Card className="flex flex-col"> {/* Added flex-grow */}
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Enter details to track a new product.</CardDescription>
          </CardHeader>
          {/* Ensure CardContent also grows and makes the form use the space */}
           <CardContent className="flex flex-col flex-grow"> {/* Added flex-grow */}
            <AddProductForm />
          </CardContent>
        </Card>
        {/* Card: Supply Chain Stages (Can remain fixed height or less priority for growth) */}
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
