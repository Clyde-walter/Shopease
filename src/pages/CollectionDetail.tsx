
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const collectionProducts = {
  '1': [
    { id: 1, name: 'Diamond Solitaire Ring', price: 3500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 2, name: 'Diamond Tennis Bracelet', price: 8500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 3, name: 'Diamond Stud Earrings', price: 2800, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: false },
  ],
  '2': [
    { id: 4, name: 'Gold Chain Necklace', price: 1200, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
    { id: 5, name: 'Gold Vintage Ring', price: 2500, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
  ]
};

const collectionInfo = {
  '1': { title: 'Diamond Elegance', description: 'Exquisite diamond jewelry crafted with precision and luxury' },
  '2': { title: 'Golden Heritage', description: 'Timeless gold pieces that blend tradition with modern design' },
  '3': { title: 'Pearl Sophistication', description: 'Lustrous pearls for the discerning connoisseur' },
  '4': { title: 'Precious Gemstones', description: 'Rare and beautiful gemstones in stunning settings' },
  '5': { title: 'Vintage Classics', description: 'Antique and vintage-inspired pieces with character' },
  '6': { title: 'Modern Minimalist', description: 'Clean, contemporary designs for the modern individual' }
};

export function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');

  const collection = collectionInfo[id as keyof typeof collectionInfo];
  const products = collectionProducts[id as keyof typeof collectionProducts] || [];

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
        <Button onClick={() => navigate('/collections')}>Back to Collections</Button>
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    console.log('Adding to cart:', product);
    // Add to cart logic would go here
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/collections')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {collection.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <select 
              className="px-3 py-2 border rounded-md"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort
            </Button>
            <select 
              className="px-3 py-2 border rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                {!product.inStock && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Out of Stock
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-ecommerce-600" 
                    onClick={() => handleProductClick(product.id)}>
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-ecommerce-600 mb-4">
                  ${product.price.toLocaleString()}
                </p>
                <Button 
                  className="w-full bg-ecommerce-600 hover:bg-ecommerce-700"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-gray-600">This collection is being curated. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
