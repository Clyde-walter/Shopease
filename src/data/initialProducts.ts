
import { Product } from '@/types/store';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: '/placeholder.svg',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: '/placeholder.svg',
    description: 'Comfortable organic cotton t-shirt in various colors',
    category: 'Clothing',
    stock: 50
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: '/placeholder.svg',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours',
    category: 'Accessories',
    stock: 30
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/placeholder.svg',
    description: 'Portable Bluetooth speaker with excellent sound quality',
    category: 'Electronics',
    stock: 20
  },
  {
    id: '5',
    name: 'Yoga Mat',
    price: 49.99,
    image: '/placeholder.svg',
    description: 'Non-slip yoga mat perfect for home workouts',
    category: 'Fitness',
    stock: 25
  },
  {
    id: '6',
    name: 'Coffee Mug Set',
    price: 34.99,
    image: '/placeholder.svg',
    description: 'Set of 4 ceramic coffee mugs with elegant design',
    category: 'Home',
    stock: 40
  }
];
