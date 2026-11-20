export interface MenuItem {
  _id: string;
  vendorId: string;
  vendorEmail: string;
  vendorName: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: 'approved' | 'pending' | 'rejected';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const MENU_CATEGORIES = [
  'Classic Pizzas',
  'Vegetarian Pizzas',
  'Meat Lovers',
  'Specialty / Gourmet Pizzas',
  'Sides & Appetizers',
  'Beverages & Desserts',
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];
