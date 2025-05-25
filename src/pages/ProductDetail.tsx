
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const productDetails = {
  // Diamond Elegance Collection
  '101': {
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
    specs: { 'Diamond Carat': '1.5', 'Metal': '18k White Gold', 'Diamond Cut': 'Brilliant', 'Setting': 'Prong' },
    collectionId: '1'
  },
  '102': {
    name: 'Diamond Tennis Bracelet',
    price: 8500,
    originalPrice: 9200,
    description: 'Elegant tennis bracelet featuring 50 brilliant cut diamonds totaling 5 carats in 18k white gold setting.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 87,
    specs: { 'Total Carats': '5.0', 'Metal': '18k White Gold', 'Diamond Count': '50', 'Length': '7 inches' },
    collectionId: '1'
  },
  '103': {
    name: 'Diamond Stud Earrings',
    price: 2800,
    originalPrice: 3200,
    description: 'Classic diamond stud earrings with 1 carat total weight in premium 18k white gold settings.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.7,
    reviews: 156,
    specs: { 'Total Carats': '1.0', 'Metal': '18k White Gold', 'Diamond Cut': 'Round Brilliant', 'Back Type': 'Push Back' },
    collectionId: '1'
  },
  '104': {
    name: 'Diamond Pendant Necklace',
    price: 4200,
    originalPrice: 4800,
    description: 'Sophisticated diamond pendant featuring a 2-carat center stone with delicate 18k gold chain.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 92,
    specs: { 'Center Stone': '2.0 carats', 'Metal': '18k Yellow Gold', 'Chain Length': '18 inches', 'Pendant Size': '12mm' },
    collectionId: '1'
  },
  '105': {
    name: 'Diamond Eternity Band',
    price: 5500,
    originalPrice: 6100,
    description: 'Exquisite eternity band with continuous diamonds around the entire band in platinum setting.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 76,
    specs: { 'Total Carats': '3.0', 'Metal': 'Platinum', 'Band Width': '3mm', 'Diamond Count': '25' },
    collectionId: '1'
  },
  '106': {
    name: 'Diamond Halo Ring',
    price: 6200,
    originalPrice: 7000,
    description: 'Stunning halo ring with 1.5-carat center diamond surrounded by smaller diamonds in white gold.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 108,
    specs: { 'Center Stone': '1.5 carats', 'Halo Diamonds': '0.5 carats', 'Metal': '14k White Gold', 'Setting': 'Halo' },
    collectionId: '1'
  },

  // Golden Heritage Collection
  '201': {
    name: 'Gold Chain Necklace',
    price: 1200,
    originalPrice: 1400,
    description: 'Classic 18k yellow gold chain necklace with timeless rope design, perfect for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    specs: { 'Metal': '18k Yellow Gold', 'Length': '20 inches', 'Width': '4mm', 'Clasp': 'Lobster' },
    collectionId: '2'
  },
  '202': {
    name: 'Gold Vintage Ring',
    price: 2500,
    originalPrice: 2800,
    description: 'Vintage-inspired gold ring with intricate filigree work and traditional craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.7,
    reviews: 64,
    specs: { 'Metal': '14k Yellow Gold', 'Style': 'Vintage Filigree', 'Ring Size': 'Adjustable', 'Weight': '8g' },
    collectionId: '2'
  },
  '203': {
    name: 'Gold Hoop Earrings',
    price: 850,
    originalPrice: 950,
    description: 'Classic gold hoop earrings with polished finish, a wardrobe essential for every jewelry collection.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 143,
    specs: { 'Metal': '14k Yellow Gold', 'Diameter': '25mm', 'Width': '3mm', 'Closure': 'Hinged' },
    collectionId: '2'
  },
  '204': {
    name: 'Gold Signet Ring',
    price: 1800,
    originalPrice: 2000,
    description: 'Traditional signet ring in solid gold with smooth surface ready for custom engraving.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.8,
    reviews: 52,
    specs: { 'Metal': '18k Yellow Gold', 'Face Size': '15mm x 12mm', 'Band Width': '4mm', 'Engraving': 'Available' },
    collectionId: '2'
  },
  '205': {
    name: 'Gold Byzantine Bracelet',
    price: 3200,
    originalPrice: 3600,
    description: 'Intricate Byzantine-style gold bracelet showcasing exceptional craftsmanship and detail.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 38,
    specs: { 'Metal': '18k Yellow Gold', 'Length': '8 inches', 'Width': '12mm', 'Style': 'Byzantine' },
    collectionId: '2'
  },
  '206': {
    name: 'Gold Locket Pendant',
    price: 1450,
    originalPrice: 1600,
    description: 'Heart-shaped gold locket pendant with space for two photos, perfect for cherished memories.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 91,
    specs: { 'Metal': '14k Yellow Gold', 'Shape': 'Heart', 'Size': '20mm x 18mm', 'Photos': '2 spaces' },
    collectionId: '2'
  },

  // Pearl Sophistication Collection
  '301': {
    name: 'Freshwater Pearl Necklace',
    price: 450,
    originalPrice: 520,
    description: 'Beautiful freshwater pearl necklace with lustrous 8-9mm pearls and sterling silver clasp.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.4,
    reviews: 127,
    specs: { 'Pearl Type': 'Freshwater', 'Size': '8-9mm', 'Length': '18 inches', 'Clasp': 'Sterling Silver' },
    collectionId: '3'
  },
  '302': {
    name: 'Tahitian Pearl Earrings',
    price: 1200,
    originalPrice: 1350,
    description: 'Exotic Tahitian black pearl earrings with 10mm pearls in 14k white gold settings.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 73,
    specs: { 'Pearl Type': 'Tahitian', 'Size': '10mm', 'Metal': '14k White Gold', 'Back Type': 'Push Back' },
    collectionId: '3'
  },
  '303': {
    name: 'South Sea Pearl Ring',
    price: 2800,
    originalPrice: 3100,
    description: 'Luxurious South Sea pearl ring with 12mm golden pearl in elegant gold setting.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 45,
    specs: { 'Pearl Type': 'South Sea', 'Size': '12mm', 'Metal': '18k Yellow Gold', 'Setting': 'Prong' },
    collectionId: '3'
  },
  '304': {
    name: 'Akoya Pearl Strand',
    price: 850,
    originalPrice: 950,
    description: 'Classic Akoya pearl strand with perfectly matched 7-7.5mm pearls and exceptional luster.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.7,
    reviews: 102,
    specs: { 'Pearl Type': 'Akoya', 'Size': '7-7.5mm', 'Length': '16 inches', 'Grade': 'AAA' },
    collectionId: '3'
  },
  '305': {
    name: 'Pearl Drop Earrings',
    price: 650,
    originalPrice: 720,
    description: 'Elegant pearl drop earrings with freshwater pearls and sterling silver findings.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 84,
    specs: { 'Pearl Type': 'Freshwater', 'Size': '9mm', 'Metal': 'Sterling Silver', 'Drop Length': '25mm' },
    collectionId: '3'
  },
  '306': {
    name: 'Baroque Pearl Bracelet',
    price: 380,
    originalPrice: 420,
    description: 'Unique baroque pearl bracelet with irregularly shaped pearls creating natural beauty.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.3,
    reviews: 67,
    specs: { 'Pearl Type': 'Baroque Freshwater', 'Size': '8-12mm', 'Length': '7.5 inches', 'Style': 'Irregular' },
    collectionId: '3'
  },

  // Precious Gemstones Collection
  '401': {
    name: 'Ruby Solitaire Ring',
    price: 3800,
    originalPrice: 4200,
    description: 'Magnificent ruby solitaire ring with 2-carat natural ruby in platinum setting.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 56,
    specs: { 'Gemstone': 'Natural Ruby', 'Carat Weight': '2.0', 'Metal': 'Platinum', 'Origin': 'Burma' },
    collectionId: '4'
  },
  '402': {
    name: 'Emerald Tennis Bracelet',
    price: 6500,
    originalPrice: 7200,
    description: 'Stunning emerald tennis bracelet with matched emeralds totaling 8 carats in white gold.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 42,
    specs: { 'Gemstone': 'Colombian Emerald', 'Total Carats': '8.0', 'Metal': '18k White Gold', 'Length': '7 inches' },
    collectionId: '4'
  },
  '403': {
    name: 'Sapphire Halo Earrings',
    price: 2200,
    originalPrice: 2500,
    description: 'Blue sapphire halo earrings with diamond surrounds in elegant white gold settings.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.7,
    reviews: 78,
    specs: { 'Center Stone': 'Blue Sapphire', 'Halo': 'Diamonds', 'Metal': '14k White Gold', 'Total Weight': '3 carats' },
    collectionId: '4'
  },
  '404': {
    name: 'Amethyst Statement Necklace',
    price: 1650,
    originalPrice: 1850,
    description: 'Bold amethyst statement necklace with large central stone and gold accents.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.6,
    reviews: 63,
    specs: { 'Center Stone': 'Amethyst', 'Carat Weight': '15.0', 'Metal': '14k Yellow Gold', 'Chain Length': '16 inches' },
    collectionId: '4'
  },
  '405': {
    name: 'Topaz Cocktail Ring',
    price: 1200,
    originalPrice: 1350,
    description: 'Eye-catching blue topaz cocktail ring with vintage-inspired design in yellow gold.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 95,
    specs: { 'Gemstone': 'Blue Topaz', 'Carat Weight': '8.0', 'Metal': '14k Yellow Gold', 'Style': 'Cocktail' },
    collectionId: '4'
  },
  '406': {
    name: 'Garnet Drop Earrings',
    price: 850,
    originalPrice: 950,
    description: 'Deep red garnet drop earrings with classic tear-drop shape in sterling silver.',
    images: [
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.4,
    reviews: 71,
    specs: { 'Gemstone': 'Garnet', 'Carat Weight': '4.0', 'Metal': 'Sterling Silver', 'Drop Length': '30mm' },
    collectionId: '4'
  },

  // Vintage Classics Collection
  '501': {
    name: 'Art Deco Diamond Ring',
    price: 2800,
    originalPrice: 3200,
    description: 'Authentic 1920s Art Deco diamond ring with geometric design and milgrain detailing.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 89,
    specs: { 'Era': 'Art Deco 1920s', 'Diamond Weight': '1.2 carats', 'Metal': 'Platinum', 'Style': 'Geometric' },
    collectionId: '5'
  },
  '502': {
    name: 'Victorian Cameo Brooch',
    price: 650,
    originalPrice: 750,
    description: 'Exquisite Victorian-era cameo brooch carved from genuine shell with gold frame.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 54,
    specs: { 'Era': 'Victorian 1880s', 'Material': 'Shell Cameo', 'Frame': '14k Yellow Gold', 'Size': '40mm x 30mm' },
    collectionId: '5'
  },
  '503': {
    name: 'Edwardian Pearl Necklace',
    price: 1200,
    originalPrice: 1400,
    description: 'Elegant Edwardian pearl necklace with filigree clasp and graduated pearl sizes.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.7,
    reviews: 67,
    specs: { 'Era': 'Edwardian 1910s', 'Pearl Type': 'Natural', 'Length': '24 inches', 'Clasp': 'Filigree Gold' },
    collectionId: '5'
  },
  '504': {
    name: 'Retro Gold Bracelet',
    price: 1800,
    originalPrice: 2100,
    description: 'Bold retro gold bracelet from the 1940s with distinctive tank track design.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 43,
    specs: { 'Era': 'Retro 1940s', 'Metal': '14k Rose Gold', 'Width': '15mm', 'Style': 'Tank Track' },
    collectionId: '5'
  },
  '505': {
    name: 'Vintage Emerald Earrings',
    price: 2200,
    originalPrice: 2600,
    description: 'Vintage emerald and diamond earrings with Art Nouveau influence and detailed metalwork.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 31,
    specs: { 'Era': 'Art Nouveau 1900s', 'Emerald Weight': '2.5 carats', 'Diamonds': '0.8 carats', 'Metal': 'Platinum' },
    collectionId: '5'
  },
  '506': {
    name: 'Antique Signet Ring',
    price: 950,
    originalPrice: 1100,
    description: 'Antique gentleman\'s signet ring with family crest engraving in solid yellow gold.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 58,
    specs: { 'Era': 'Victorian 1890s', 'Metal': '18k Yellow Gold', 'Engraving': 'Family Crest', 'Size': '18mm face' },
    collectionId: '5'
  },

  // Modern Minimalist Collection
  '601': {
    name: 'Minimalist Gold Ring',
    price: 320,
    originalPrice: 380,
    description: 'Simple and elegant gold band with brushed finish, perfect for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.4,
    reviews: 198,
    specs: { 'Metal': '14k Yellow Gold', 'Width': '2mm', 'Finish': 'Brushed', 'Style': 'Band' },
    collectionId: '6'
  },
  '602': {
    name: 'Geometric Silver Earrings',
    price: 180,
    originalPrice: 220,
    description: 'Contemporary geometric earrings in sterling silver with clean architectural lines.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.3,
    reviews: 156,
    specs: { 'Metal': 'Sterling Silver', 'Style': 'Geometric', 'Size': '20mm x 15mm', 'Back Type': 'Post' },
    collectionId: '6'
  },
  '603': {
    name: 'Contemporary Diamond Pendant',
    price: 850,
    originalPrice: 950,
    description: 'Modern diamond pendant with clean bezel setting and adjustable chain length.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 87,
    specs: { 'Diamond Weight': '0.5 carats', 'Metal': '14k White Gold', 'Setting': 'Bezel', 'Chain': '16-18 inches' },
    collectionId: '6'
  },
  '604': {
    name: 'Modern Link Bracelet',
    price: 450,
    originalPrice: 520,
    description: 'Sleek modern bracelet with interlocking links in polished stainless steel.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: false,
    rating: 4.2,
    reviews: 124,
    specs: { 'Material': 'Stainless Steel', 'Length': '8 inches', 'Width': '8mm', 'Closure': 'Magnetic' },
    collectionId: '6'
  },
  '605': {
    name: 'Sleek Band Ring',
    price: 280,
    originalPrice: 320,
    description: 'Ultra-thin band ring in polished gold with mirror finish for a modern look.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 167,
    specs: { 'Metal': '14k Yellow Gold', 'Width': '1.5mm', 'Finish': 'High Polish', 'Profile': 'Flat' },
    collectionId: '6'
  },
  '606': {
    name: 'Linear Drop Earrings',
    price: 320,
    originalPrice: 380,
    description: 'Elegant linear drop earrings with elongated design in brushed silver finish.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    ],
    inStock: true,
    rating: 4.4,
    reviews: 92,
    specs: { 'Metal': 'Sterling Silver', 'Length': '40mm', 'Width': '3mm', 'Finish': 'Brushed' },
    collectionId: '6'
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
