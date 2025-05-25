
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const productDetails = {
  '1': {
    name: 'Diamond Solitaire Ring',
    price: 3500,
    originalPrice: 4200,
    description: 'A stunning solitaire diamond ring featuring a brilliant cut 1.5 carat diamond set in 18k white gold. This timeless piece represents eternal love and commitment.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    specs: {
      'Diamond Carat': '1.5',
      'Metal': '18k White Gold',
      'Diamond Cut': 'Brilliant',
      'Setting': 'Prong',
    },
    collectionId: '1'
  }
};

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = productDetails[id as keyof typeof productDetails];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/collections')}>Back to Collections</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product, 'Quantity:', quantity);
    // Add to cart logic
  };

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(`/collection/${product.collectionId}`)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Collection
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-ecommerce-600' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-ecommerce-600">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-ecommerce-600 hover:bg-ecommerce-700"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="text-red-500 hover:text-red-700"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </Button>
          </div>

          {/* Product Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="w-5 h-5 text-ecommerce-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-5 h-5 text-ecommerce-600" />
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RotateCcw className="w-5 h-5 text-ecommerce-600" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
