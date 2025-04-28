
'use client';

import type { Product, TrackingEvent } from "@/types/product";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Factory, Ship, Truck, CheckCircle2, Package, Clock } from "lucide-react";
import { AddTrackingEventForm } from "./add-tracking-event-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format, parseISO } from 'date-fns'; // Use date-fns for formatting

const stageIcons: { [key in TrackingEvent['stage']]: React.ElementType } = {
  Production: Factory,
  Shipping: Ship,
  Delivery: Truck,
  Received: CheckCircle2,
};

// Using Tailwind classes directly for better theme integration
const stageStyles: { [key in TrackingEvent['stage']]: { badge: string; text: string; iconBg: string } } = {
    Production: { badge: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', text: 'text-blue-700 dark:text-blue-400', iconBg: 'bg-blue-100 dark:bg-blue-900/30' },
    Shipping:   { badge: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', text: 'text-yellow-700 dark:text-yellow-400', iconBg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    Delivery:   { badge: 'border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', text: 'text-purple-700 dark:text-purple-400', iconBg: 'bg-purple-100 dark:bg-purple-900/30' },
    Received:   { badge: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', text: 'text-green-700 dark:text-green-400', iconBg: 'bg-green-100 dark:bg-green-900/30' },
};


export function ProductCard({ product }: { product: Product }) {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined);
  const latestEvent = product.trackingHistory[product.trackingHistory.length - 1];

  const handleTrackingUpdateSuccess = () => {
    setAccordionValue(undefined); // Close the accordion on success
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                 <Package className="h-5 w-5 text-primary" /> {product.name}
                </CardTitle>
                <CardDescription className="mt-1 text-sm">{product.details}</CardDescription>
            </div>
            {latestEvent && (
                <Badge variant="outline" className={`whitespace-nowrap text-xs font-medium ${stageStyles[latestEvent.stage]?.badge ?? ''}`}>
                    {latestEvent.stage}
                </Badge>
            )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow pb-4 space-y-3">
         <Separator />
         <h4 className="font-medium text-sm text-muted-foreground">Tracking History</h4>
        {product.trackingHistory.length > 0 ? (
           <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-3 -mr-3">
            {product.trackingHistory
                .slice() // Create a copy to avoid mutating the original prop
                .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()) // Sort by date descending
                .map((event) => {
                  const Icon = stageIcons[event.stage] || Package;
                  const styles = stageStyles[event.stage];
                  return (
                    <div key={event.id} className="flex items-start gap-3 text-sm group">
                      <div className={`flex-shrink-0 p-1.5 rounded-full ${styles?.iconBg ?? 'bg-muted'} mt-0.5 border border-border`}>
                         <Icon className={`h-4 w-4 ${styles?.text ?? 'text-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
                        <div className="flex justify-between items-center mb-0.5">
                             <span className={`font-medium ${styles?.text ?? 'text-foreground'}`}>{event.stage}</span>
                             <span className="text-xs text-muted-foreground flex items-center gap-1">
                               <Clock className="h-3 w-3" />
                               {format(parseISO(event.date), 'MMM d, yyyy')}
                             </span>
                        </div>
                        <p className="text-muted-foreground text-xs break-words">{event.location}</p>
                        <p className="text-xs text-foreground mt-0.5 break-words">{event.status}</p>
                      </div>
                    </div>
                  );
            })}
           </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">No tracking history available yet.</p>
        )}
      </CardContent>

       <CardFooter className="p-0 border-t">
         <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
            <AccordionItem value="add-tracking" className="border-b-0">
                <AccordionTrigger className="text-sm px-6 py-3 hover:no-underline text-primary hover:text-primary/90 data-[state=open]:bg-muted/50">
                    Update Tracking Status
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                    <AddTrackingEventForm
                        productId={product.id}
                        onSuccess={handleTrackingUpdateSuccess}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
