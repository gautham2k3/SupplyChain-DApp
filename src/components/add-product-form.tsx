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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PackagePlus, Loader2 } from "lucide-react";
import { useProducts } from "@/context/product-context"; // Import useProducts hook
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  details: z.string().min(5, {
    message: "Product details must be at least 5 characters.",
  }),
  initialLocation: z.string().min(3, {
    message: "Initial location must be at least 3 characters.",
  }),
});

export function AddProductForm() {
  const { toast } = useToast();
  const { addProduct } = useProducts(); // Get addProduct function from context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      details: "",
      initialLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate async operation if needed, or directly call addProduct
    // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    const result = addProduct(values.name, values.details, values.initialLocation);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset(); // Reset form fields
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
      {/* Removed flex-grow, justify-between from form and mt-auto from button */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <div className="space-y-4"> {/* Group form fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Organic Coffee Beans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Details</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="e.g., 1kg bag, Arabica, Fair Trade Certified" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Location (Production)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Farm Zen, Darjeling" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        {/* Removed mt-auto */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <PackagePlus />
          )}
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
