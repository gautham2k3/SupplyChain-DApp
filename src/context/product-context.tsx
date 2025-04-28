"use client";

import type { Product, TrackingEvent } from '@/types/product';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface ProductContextType {
  products: Product[];
  addProduct: (name: string, details: string, initialLocation: string) => { success: boolean; message: string };
  addTrackingEvent: (productId: string, stage: TrackingEvent['stage'], location: string, status: string) => { success: boolean; message: string };
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'chainlink-products';

// Initial data if localStorage is empty
const initialProducts: Product[] = [
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

let nextProductId = 3; // Keep track of IDs
let nextEventIdSuffix = 3; // Keep track of event ID suffixes


export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load products from localStorage on initial mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        // Update next IDs based on loaded data
        nextProductId = parsedProducts.length > 0
          ? Math.max(...parsedProducts.map((p: Product) => parseInt(p.id.split('-')[1]))) + 1
          : 1;
      } else {
        // Initialize with default data if nothing in localStorage
        setProducts(initialProducts);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProducts));
        nextProductId = initialProducts.length + 1;
      }
    } catch (error) {
      console.error("Failed to load products from localStorage:", error);
      // Fallback to initial data in case of error
      setProducts(initialProducts);
       nextProductId = initialProducts.length + 1;
    } finally {
        setIsLoading(false); // Set loading to false after attempting to load
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    // Don't save during initial load
    if (!isLoading) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
        } catch (error) {
            console.error("Failed to save products to localStorage:", error);
        }
    }
  }, [products, isLoading]);

  const addProduct = useCallback((name: string, details: string, initialLocation: string) => {
    if (!name || !details || !initialLocation) {
      return { success: false, message: 'Missing required fields.' };
    }

    const newProductId = `prod-${String(nextProductId++).padStart(3, '0')}`;
    const newEventId = `evt-${newProductId}-${String(nextEventIdSuffix++).padStart(3, '0')}a`;

    const newProduct: Product = {
      id: newProductId,
      name,
      details,
      trackingHistory: [
        {
          id: newEventId,
          stage: 'Production',
          location: initialLocation,
          date: new Date().toISOString().split('T')[0], // Current date
          status: 'Created',
        },
      ],
    };

    setProducts(prevProducts => [...prevProducts, newProduct]);
    return { success: true, message: 'Product added successfully.' };
  }, []);

  const addTrackingEvent = useCallback((productId: string, stage: TrackingEvent['stage'], location: string, status: string) => {
    if (!stage || !location || !status) {
      return { success: false, message: 'Missing required tracking fields.' };
    }

    setProducts(prevProducts => {
      const productIndex = prevProducts.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        // Although this case shouldn't happen with the UI flow, handle it defensively.
        console.error("Product not found for tracking event:", productId);
        // Returning prevProducts prevents state update but doesn't signal failure to the caller easily here.
        // Consider how to handle this better if it's a possible scenario.
        return prevProducts;
      }

      const newEvent: TrackingEvent = {
        id: `evt-${productId}-${String(prevProducts[productIndex].trackingHistory.length + 1).padStart(3, '0')}`,
        stage,
        location,
        date: new Date().toISOString().split('T')[0], // Current date
        status,
      };

      // Create a new array with the updated product for immutability
      const updatedProducts = [...prevProducts];
      const updatedProduct = {
        ...updatedProducts[productIndex],
        trackingHistory: [...updatedProducts[productIndex].trackingHistory, newEvent],
      };
      updatedProducts[productIndex] = updatedProduct;

      return updatedProducts;
    });

    return { success: true, message: 'Tracking event added successfully.' };
  }, []);


  return (
    <ProductContext.Provider value={{ products, addProduct, addTrackingEvent, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
