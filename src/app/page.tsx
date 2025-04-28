import { AddProductForm } from '@/components/add-product-form';
import { ProductTrackingList } from '@/components/product-tracking-list';
import { SupplyChainVisualization } from '@/components/supply-chain-visualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <AddProductForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SupplyChainVisualization />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTrackingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
