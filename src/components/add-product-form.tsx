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
import { addProduct } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { PackagePlus } from "lucide-react";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      details: "",
      initialLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('details', values.details);
    formData.append('initialLocation', values.initialLocation);

    const result = await addProduct(formData);

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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Textarea placeholder="e.g., 1kg bag, Arabica, Fair Trade Certified" {...field} />
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
                <Input placeholder="e.g., Farm A, Colombia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-primary hover:bg-primary/90">
           <PackagePlus className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
