import { Factory, Ship, Truck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stages = [
  { name: "Production", icon: Factory, color: "text-blue-600" },
  { name: "Shipping", icon: Ship, color: "text-yellow-600" },
  { name: "Delivery", icon: Truck, color: "text-purple-600" },
  { name: "Received", icon: CheckCircle2, color: "text-green-600" },
];

export function SupplyChainVisualization() {
  return (
    <Card className="bg-card border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex justify-between items-center relative space-x-2">
          {/* Dashed line background */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 z-0"></div>

          {/* Stage Icons */}
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={stage.name} className="flex flex-col items-center z-10 bg-card px-2">
                <div className={`p-2 rounded-full border-2 border-current ${stage.color} mb-1 bg-background shadow-sm`}>
                  <Icon className={`h-5 w-5 ${stage.color}`} />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground">{stage.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
