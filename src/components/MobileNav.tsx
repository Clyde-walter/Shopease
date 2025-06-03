
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Package, Layers, ShoppingBag, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/collections', label: 'Collections', icon: Layers },
    { path: '/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/live-map', label: 'Live Map', icon: MapPin },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-ecommerce-50">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className="text-left text-ecommerce-600 font-bold text-xl">
              ShopEase
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-ecommerce-100 text-ecommerce-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
