export interface TrackingEvent {
  id: string;
  stage: 'Production' | 'Shipping' | 'Delivery' | 'Received';
  location: string;
  date: string; // Consider using Date type if more complex date manipulation is needed
  status: string;
}

export interface Product {
  id: string;
  name: string;
  details: string;
  trackingHistory: TrackingEvent[];
}
