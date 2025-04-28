"use server";

import { revalidatePath } from 'next/cache';
import type { Product, TrackingEvent } from '@/types/product';

// In-memory store for demo purposes. Replace with a database in a real application.
let products: Product[] = [
 {
    id: 'prod-001',
    name: 'Organic Coffee Beans',
    details: '1kg bag, Arabica, Fair Trade Certified',
    trackingHistory: [
      { id: 'evt-001a', stage: 'Production', location: 'Farm A, Colombia', date: '2024-07-15', status: 'Harvested' },
      { id: 'evt-001b', stage: 'Shipping', location: 'Port of Cartagena', date: '2024-07-20', status: 'Loaded onto Vessel X' },
      { id: 'evt-001c', stage: 'Delivery', location: 'Warehouse B, Miami', date: '2024-08-01', status: 'Received at Warehouse' },
    ],
  },
  {
    id: 'prod-002',
    name: 'Advanced Microchips',
    details: 'Model XZ-9000, 100 units',
    trackingHistory: [
      { id: 'evt-002a', stage: 'Production', location: 'Factory Z, Taiwan', date: '2024-07-18', status: 'Manufacturing Complete' },
      { id: 'evt-002b', stage: 'Shipping', location: 'Air Cargo Hub, Taipei', date: '2024-07-22', status: 'Shipped via Air Freight ABC' },
    ],
  },
];
let nextProductId = 3;
let nextEventId = 3; // Simple counter for event IDs

export async function addProduct(formData: FormData): Promise<{ success: boolean; message: string }> {
  const name = formData.get('name') as string;
  const details = formData.get('details') as string;
  const initialLocation = formData.get('initialLocation') as string;

  if (!name || !details || !initialLocation) {
    return { success: false, message: 'Missing required fields.' };
  }

  const newProduct: Product = {
    id: `prod-${String(nextProductId++).padStart(3, '0')}`,
    name,
    details,
    trackingHistory: [
      {
        id: `evt-${String(nextEventId++).padStart(3, '0')}a`,
        stage: 'Production',
        location: initialLocation,
        date: new Date().toISOString().split('T')[0], // Current date
        status: 'Created',
      },
    ],
  };

  products.push(newProduct);
  console.log('Added product:', newProduct);
  console.log('Current products:', products);
  revalidatePath('/'); // Revalidate the page to show the new product
  return { success: true, message: 'Product added successfully.' };
}


export async function addTrackingEvent(productId: string, formData: FormData): Promise<{ success: boolean; message: string }> {
  const stage = formData.get('stage') as TrackingEvent['stage'];
  const location = formData.get('location') as string;
  const status = formData.get('status') as string;

  if (!stage || !location || !status) {
    return { success: false, message: 'Missing required tracking fields.' };
  }

  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return { success: false, message: 'Product not found.' };
  }

  const newEvent: TrackingEvent = {
    id: `evt-${productId}-${String(products[productIndex].trackingHistory.length + 1).padStart(3, '0')}`,
    stage,
    location,
    date: new Date().toISOString().split('T')[0], // Current date
    status,
  };

  // Create a new array with the updated product
  const updatedProduct = {
      ...products[productIndex],
      trackingHistory: [...products[productIndex].trackingHistory, newEvent],
  };

  // Create a new products array
  products = [
      ...products.slice(0, productIndex),
      updatedProduct,
      ...products.slice(productIndex + 1),
  ];


  console.log('Added tracking event:', newEvent, 'to product:', productId);
  console.log('Updated product:', products[productIndex]);
  revalidatePath('/'); // Revalidate the page to show the updated tracking
  return { success: true, message: 'Tracking event added successfully.' };
}

export async function getProducts(): Promise<Product[]> {
  // In a real app, fetch this from your database
  return Promise.resolve(products);
}
