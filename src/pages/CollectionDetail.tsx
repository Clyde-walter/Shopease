
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const collectionProducts = {
  '1': [
    { id: 101, name: 'Diamond Solitaire Ring', price: 3500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 102, name: 'Diamond Tennis Bracelet', price: 8500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 103, name: 'Diamond Stud Earrings', price: 2800, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: false },
    { id: 104, name: 'Diamond Pendant Necklace', price: 4200, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 105, name: 'Diamond Eternity Band', price: 5500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
    { id: 106, name: 'Diamond Halo Ring', price: 6200, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', inStock: true },
  ],
  '2': [
    { id: 201, name: 'Gold Chain Necklace', price: 1200, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
    { id: 202, name: 'Gold Vintage Ring', price: 2500, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
    { id: 203, name: 'Gold Hoop Earrings', price: 850, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
    { id: 204, name: 'Gold Signet Ring', price: 1800, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: false },
    { id: 205, name: 'Gold Byzantine Bracelet', price: 3200, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
    { id: 206, name: 'Gold Locket Pendant', price: 1450, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', inStock: true },
  ],
  '3': [
    { id: 301, name: 'Freshwater Pearl Necklace', price: 450, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: true },
    { id: 302, name: 'Tahitian Pearl Earrings', price: 1200, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: true },
    { id: 303, name: 'South Sea Pearl Ring', price: 2800, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: true },
    { id: 304, name: 'Akoya Pearl Strand', price: 850, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: false },
    { id: 305, name: 'Pearl Drop Earrings', price: 650, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: true },
    { id: 306, name: 'Baroque Pearl Bracelet', price: 380, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', inStock: true },
  ],
  '4': [
    { id: 401, name: 'Ruby Solitaire Ring', price: 3800, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: true },
    { id: 402, name: 'Emerald Tennis Bracelet', price: 6500, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: true },
    { id: 403, name: 'Sapphire Halo Earrings', price: 2200, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: true },
    { id: 404, name: 'Amethyst Statement Necklace', price: 1650, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: false },
    { id: 405, name: 'Topaz Cocktail Ring', price: 1200, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: true },
    { id: 406, name: 'Garnet Drop Earrings', price: 850, image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop', inStock: true },
  ],
  '5': [
    { id: 501, name: 'Art Deco Diamond Ring', price: 2800, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: true },
    { id: 502, name: 'Victorian Cameo Brooch', price: 650, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: true },
    { id: 503, name: 'Edwardian Pearl Necklace', price: 1200, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: false },
    { id: 504, name: 'Retro Gold Bracelet', price: 1800, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: true },
    { id: 505, name: 'Vintage Emerald Earrings', price: 2200, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: true },
    { id: 506, name: 'Antique Signet Ring', price: 950, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', inStock: true },
  ],
  '6': [
    { id: 601, name: 'Minimalist Gold Ring', price: 320, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: true },
    { id: 602, name: 'Geometric Silver Earrings', price: 180, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: true },
    { id: 603, name: 'Contemporary Diamond Pendant', price: 850, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: true },
    { id: 604, name: 'Modern Link Bracelet', price: 450, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: false },
    { id: 605, name: 'Sleek Band Ring', price: 280, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: true },
    { id: 606, name: 'Linear Drop Earrings', price: 320, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', inStock: true },
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
