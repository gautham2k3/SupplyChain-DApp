import { Factory, Ship, Truck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stages = [
  { name: "Production", icon: Factory, color: "text-blue-600", border: "border-blue-600/50" },
  { name: "Shipping", icon: Ship, color: "text-yellow-600", border: "border-yellow-600/50" },
  { name: "Delivery", icon: Truck, color: "text-purple-600", border: "border-purple-600/50" },
  { name: "Received", icon: CheckCircle2, color: "text-green-600", border: "border-green-600/50" },
];

export function SupplyChainVisualization() {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-2 md:p-4">
        <div className="flex justify-between items-start relative pt-2">
          {/* Connecting Line */}
          <div className="absolute top-[calc(0.75rem+1px)] left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 z-0" />

          {/* Stage Icons */}
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isFirst = index === 0;
            const isLast = index === stages.length - 1;

            return (
              <div key={stage.name} className={`flex flex-col items-center z-10 ${isFirst ? 'items-start' : isLast ? 'items-end' : 'items-center'} w-1/4`}>
                <div className={`relative p-1.5 rounded-full border ${stage.border} ${stage.color} mb-1 bg-background shadow-sm`}>
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 ${stage.color}`} />
                  {/* Dot on the line */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full ${stage.color} bg-current z-10`} />
                </div>
                <span className="text-xs text-center text-muted-foreground mt-1 px-1">{stage.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
