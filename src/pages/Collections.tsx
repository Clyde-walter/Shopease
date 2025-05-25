
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: "Diamond Elegance",
    description: "Exquisite diamond jewelry crafted with precision and luxury",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    itemCount: 24,
    priceRange: "$2,500 - $15,000"
  },
  {
    id: 2,
    title: "Golden Heritage",
    description: "Timeless gold pieces that blend tradition with modern design",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop",
    itemCount: 18,
    priceRange: "$800 - $5,500"
  },
  {
    id: 3,
    title: "Pearl Sophistication",
    description: "Lustrous pearls for the discerning connoisseur",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=400&fit=crop",
    itemCount: 15,
    priceRange: "$300 - $2,800"
  },
  {
    id: 4,
    title: "Precious Gemstones",
    description: "Rare and beautiful gemstones in stunning settings",
    image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=400&fit=crop",
    itemCount: 32,
    priceRange: "$1,200 - $8,500"
  },
  {
    id: 5,
    title: "Vintage Classics",
    description: "Antique and vintage-inspired pieces with character",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop",
    itemCount: 12,
    priceRange: "$600 - $4,200"
  },
  {
    id: 6,
    title: "Modern Minimalist",
    description: "Clean, contemporary designs for the modern individual",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop",
    itemCount: 28,
    priceRange: "$250 - $1,800"
  }
];

export function Collections() {
  const navigate = useNavigate();

  const handleExploreCollection = (collectionId: number) => {
    navigate(`/collection/${collectionId}`);
  };

  const handleCustomDesign = () => {
    navigate('/custom-design');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Jewelry Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections of exquisite jewelry, each piece carefully selected 
            to bring elegance and sophistication to your style
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-ecommerce-600 transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {collection.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {collection.itemCount} pieces
                    </span>
                    <span className="font-medium">
                      {collection.priceRange}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-ecommerce-600 hover:bg-ecommerce-700 text-white font-semibold py-3 group-hover:shadow-lg transition-all duration-300"
                    onClick={() => handleExploreCollection(collection.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Explore Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert jewelers can create custom pieces tailored to your unique style and preferences. 
            Contact us to discuss your vision.
          </p>
          <Button 
            className="bg-ecommerce-600 hover:bg-ecommerce-700 text-white px-8 py-3 text-lg"
            onClick={handleCustomDesign}
          >
            Request Custom Design
          </Button>
        </div>
      </div>
    </div>
  );
}
