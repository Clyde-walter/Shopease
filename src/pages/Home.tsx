
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Home() {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  const heroImages = [
    {
      id: 1,
      title: "Elegant Diamond Collection",
      subtitle: "Timeless beauty crafted to perfection",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      cta: "Shop Diamonds"
    },
    {
      id: 2,
      title: "Luxury Gold Jewelry",
      subtitle: "Exquisite craftsmanship in every piece",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      cta: "Explore Gold"
    },
    {
      id: 3,
      title: "Sterling Silver Designs",
      subtitle: "Modern elegance meets classic style",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      cta: "Shop Silver"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Carousel Section */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroImages.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[70vh] min-h-[500px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl px-4">
                      <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                        {slide.title}
                      </h1>
                      <p className="text-xl mb-8 text-gray-200 animate-fade-in">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <Link to="/collections">
                          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                            {slide.cta}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                        <Link to="/products">
                          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                            View All Products
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50. Fast and reliable delivery worldwide.</p>
          </div>
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Your payment information is protected with bank-level security.</p>
          </div>
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
            <p className="text-gray-600">Not satisfied? Return any item within 30 days for a full refund.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the best products across all categories.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="bg-ecommerce-600 hover:bg-ecommerce-700">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and be the first to know about new products, sales, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecommerce-500 focus:border-transparent"
              />
              <Button className="bg-ecommerce-600 hover:bg-ecommerce-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
