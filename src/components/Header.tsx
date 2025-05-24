
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';
import { CartSidebar } from './CartSidebar';

export function Header() {
  const location = useLocation();
  const { cart } = useStore();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-ecommerce-600 hover:text-ecommerce-700 transition-colors">
              ShopEase
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors hover:text-ecommerce-600 ${
                  isActive('/') ? 'text-ecommerce-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`font-medium transition-colors hover:text-ecommerce-600 ${
                  isActive('/products') ? 'text-ecommerce-600' : 'text-gray-700'
                }`}
              >
                Products
              </Link>
              <Link
                to="/orders"
                className={`font-medium transition-colors hover:text-ecommerce-600 ${
                  isActive('/orders') ? 'text-ecommerce-600' : 'text-gray-700'
                }`}
              >
                Orders
              </Link>
              <Link
                to="/admin"
                className={`font-medium transition-colors hover:text-ecommerce-600 ${
                  isActive('/admin') ? 'text-ecommerce-600' : 'text-gray-700'
                }`}
              >
                Admin
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-ecommerce-50"
              >
                <Search className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-ecommerce-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ecommerce-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-ecommerce-50">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="mt-4 animate-fade-in">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecommerce-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
