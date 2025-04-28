import type { Product, TrackingEvent } from "@/types/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Factory, Ship, Truck, CheckCircle2, Package } from "lucide-react";
import { AddTrackingEventForm } from "./add-tracking-event-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from 'date-fns'; // Use date-fns for formatting

const stageIcons: { [key in TrackingEvent['stage']]: React.ElementType } = {
  Production: Factory,
  Shipping: Ship,
  Delivery: Truck,
  Received: CheckCircle2,
};

const stageColors: { [key in TrackingEvent['stage']]: string } = {
    Production: 'bg-blue-100 text-blue-800 border-blue-300',
    Shipping: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Delivery: 'bg-purple-100 text-purple-800 border-purple-300',
    Received: 'bg-green-100 text-green-800 border-green-300',
};


export function ProductCard({ product }: { product: Product }) {
  const latestEvent = product.trackingHistory[product.trackingHistory.length - 1];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-5 w-5 text-primary" /> {product.name}
                </CardTitle>
                <CardDescription>{product.details}</CardDescription>
            </div>
            {latestEvent && (
                <Badge variant="secondary" className={`whitespace-nowrap ${stageColors[latestEvent.stage]}`}>
                    {latestEvent.stage}
                </Badge>
            )}
        </div>

      </CardHeader>
      <CardContent className="pb-4">
         <Separator className="my-3" />
         <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Tracking History:</h4>
        {product.trackingHistory.length > 0 ? (
           <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {product.trackingHistory.map((event, index) => {
              const Icon = stageIcons[event.stage] || Package;
              return (
                <div key={event.id} className="flex items-start gap-3 text-sm">
                  <div className={`p-1.5 rounded-full ${stageColors[event.stage]} mt-0.5`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                         <span className={`font-medium ${stageColors[event.stage].split(' ')[1]}`}>{event.stage}</span>
                         <span className="text-xs text-muted-foreground">{format(new Date(event.date), 'PP')}</span>
                    </div>
                    <p className="text-muted-foreground">{event.location}</p>
                    <p className="text-xs text-foreground">{event.status}</p>
                  </div>
                </div>
              );
            })}
           </div>
        ) : (
          <p className="text-sm text-muted-foreground">No tracking history available.</p>
        )}
      </CardContent>
       <CardFooter>
         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="add-tracking" className="border-b-0">
                <AccordionTrigger className="text-sm py-2 hover:no-underline text-primary hover:text-primary/80">
                    Update Tracking Status
                </AccordionTrigger>
                <AccordionContent>
                    <AddTrackingEventForm productId={product.id} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
