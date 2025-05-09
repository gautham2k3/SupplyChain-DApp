"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, PlusCircle, Loader2 } from "lucide-react";
import { useProducts } from "@/context/product-context"; // Import useProducts hook
import type { TrackingEvent } from "@/types/product"; // Import TrackingEvent type
import { useState } from "react";

const trackingStages: ReadonlyArray<TrackingEvent['stage']> = ['Production', 'Shipping', 'Delivery', 'Received'] as const;

const formSchema = z.object({
  stage: z.enum(trackingStages, { required_error: "Please select a stage."}),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  status: z.string().min(3, {
    message: "Status must be at least 3 characters.",
  }),
});

interface AddTrackingEventFormProps {
  productId: string;
  onSuccess?: () => void; // Optional callback on success
}

export function AddTrackingEventForm({ productId, onSuccess }: AddTrackingEventFormProps) {
  const { toast } = useToast();
  const { addTrackingEvent } = useProducts(); // Get addTrackingEvent function from context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stage: undefined, // Start with no default stage selected
      location: "",
      status: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate async operation if needed
    // await new Promise(resolve => setTimeout(resolve, 500));

    const result = addTrackingEvent(productId, values.stage, values.location, values.status);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset(); // Reset form fields
      onSuccess?.(); // Call the success callback if provided
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-1">
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trackingStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., Warehouse B, Miami" className="pl-8" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Update</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Received at Warehouse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" variant="outline" disabled={isSubmitting} className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary gap-2">
           {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <PlusCircle />
          )}
          {isSubmitting ? 'Adding Event...' : 'Add Tracking Event'}
        </Button>
      </form>
    </Form>
  );
}
