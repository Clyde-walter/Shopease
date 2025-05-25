
import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';

export function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleRemoveFromWishlist = (itemId: string, itemName: string) => {
    removeFromWishlist(itemId);
    toast({
      title: "Removed from wishlist",
      description: `${itemName} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <Card>
          <CardContent className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items to your wishlist.</p>
            <Link to="/products">
              <Button className="bg-ecommerce-600 hover:bg-ecommerce-700">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-600">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-red-500 bg-white hover:bg-red-50"
                onClick={() => handleRemoveFromWishlist(item.id, item.name)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-ecommerce-600 font-bold text-lg">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">${item.originalPrice}</span>
                    )}
                  </div>
                </div>
                {item.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                )}
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-ecommerce-600 hover:bg-ecommerce-700 text-white"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
