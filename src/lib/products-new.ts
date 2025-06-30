import { Product } from '@/types';

export const products: Product[] = [
  // Women's Clothing - Premium Fashion Collection
  {
    id: '1',
    name: 'Luxe Silk Blend Midi Dress',
    description: 'Elevate your wardrobe with this sophisticated silk blend midi dress. Featuring a flattering A-line silhouette, this dress drapes beautifully on the body while maintaining structure. The subtle sheen of the silk blend fabric adds an elegant touch perfect for boardroom meetings or evening cocktails. Complete with a hidden back zipper and lined interior for comfort and longevity.',
    price: 168.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Midnight Black', 'Deep Navy', 'Champagne'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    brand: 'Atelier Luna',
    rating: 4.8,
    reviewCount: 47,
    tags: ['dress', 'silk', 'formal', 'midi', 'luxury'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Heritage Cashmere Turtleneck',
    description: 'Crafted from 100% pure cashmere sourced from the highlands of Mongolia, this turtleneck represents the pinnacle of luxury knitwear. The ultra-soft 12-gauge knit provides exceptional warmth without bulk, while the relaxed fit ensures comfort throughout the day. Features reinforced seams and a timeless design that transcends seasons.',
    price: 245.00,
    salePrice: 196.00,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Oatmeal', 'Charcoal', 'Camel', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
    brand: 'Meridian Cashmere',
    rating: 4.9,
    reviewCount: 83,
    tags: ['cashmere', 'turtleneck', 'luxury', 'winter', 'knitwear'],
    isSale: true,
  },
  {
    id: '3',
    name: 'Italian Leather Ankle Boots',
    description: 'Handcrafted in Florence from premium Italian leather, these ankle boots combine traditional craftsmanship with contemporary design. The subtle block heel provides comfortable elevation while the supple leather ensures a perfect fit that improves with wear. Features a side zipper for easy on-off and a cushioned leather insole for all-day comfort.',
    price: 298.00,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',
    category: 'Shoes',
    inStock: true,
    colors: ['Black', 'Cognac Brown', 'Deep Burgundy'],
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    brand: 'Firenze Footwear',
    rating: 4.7,
    reviewCount: 62,
    tags: ['boots', 'leather', 'italian', 'ankle', 'handcrafted'],
  },
  {
    id: '4',
    name: 'Tailored Blazer with Gold Buttons',
    description: 'A modern interpretation of the classic blazer, tailored to perfection in a premium wool blend. The structured shoulders and nipped waist create a flattering silhouette, while the signature gold-tone buttons add a touch of sophistication. Fully lined with functional pockets and working buttonholes on the sleeves.',
    price: 285.00,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Navy Blue', 'Classic Black', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    brand: 'Savile & Co',
    rating: 4.6,
    reviewCount: 34,
    tags: ['blazer', 'tailored', 'professional', 'wool', 'formal'],
  },
  {
    id: '5',
    name: 'High-Rise Wide Leg Trousers',
    description: 'Inspired by 1970s sophistication, these high-rise wide leg trousers create an effortlessly chic silhouette. Cut from a luxurious ponte fabric that maintains its shape while providing comfort and movement. Features a flat front design, side zip closure, and a flowing wide leg that elongates the figure.',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Black', 'Cream', 'Forest Green'],
    sizes: ['24', '26', '28', '30', '32', '34'],
    brand: 'Studio Moderne',
    rating: 4.5,
    reviewCount: 28,
    tags: ['trousers', 'wide-leg', 'high-rise', '70s', 'sophisticated'],
  },

  // Men's Clothing - Refined Masculine Collection
  {
    id: '6',
    name: 'Merino Wool V-Neck Sweater',
    description: 'Exceptional merino wool sweater that embodies timeless masculine elegance. The fine-gauge knit provides superior temperature regulation and softness against the skin. Classic V-neck design with ribbed trim at the collar, cuffs, and hem. Perfect for layering over dress shirts or wearing solo with jeans.',
    price: 128.00,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop',
    category: "Men's Clothing",
    inStock: true,
    colors: ['Charcoal Gray', 'Navy Blue', 'Burgundy', 'Forest Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Highlands Wool',
    rating: 4.7,
    reviewCount: 56,
    tags: ['sweater', 'merino', 'v-neck', 'wool', 'classic'],
  },
  {
    id: '7',
    name: 'Selvedge Denim Straight Jeans',
    description: 'Premium Japanese selvedge denim crafted on vintage shuttle looms for authentic character and durability. The 14oz weight provides substantial feel while maintaining comfort through thoughtful construction. Features a classic straight leg cut, contrast stitching, and copper rivets at stress points. Designed to age beautifully with wear.',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    category: "Men's Clothing",
    inStock: true,
    colors: ['Raw Indigo', 'One Wash'],
    sizes: ['30', '31', '32', '33', '34', '36', '38'],
    brand: 'Heritage Denim Co',
    rating: 4.8,
    reviewCount: 41,
    tags: ['jeans', 'selvedge', 'denim', 'japanese', 'straight'],
    isNew: true,
  },
  {
    id: '8',
    name: 'Luxury Oxford Dress Shirt',
    description: 'Meticulously crafted from 100% two-fold cotton with a subtle royal oxford weave. The spread collar and barrel cuffs create a refined silhouette perfect for business or formal occasions. Features mother-of-pearl buttons, single-needle stitching, and a curved hem that works beautifully tucked or untucked.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop',
    category: "Men's Clothing",
    inStock: true,
    colors: ['Pure White', 'Light Blue', 'Pale Pink'],
    sizes: ['14.5', '15', '15.5', '16', '16.5', '17', '17.5'],
    brand: 'Bespoke Brothers',
    rating: 4.9,
    reviewCount: 78,
    tags: ['shirt', 'oxford', 'dress', 'formal', 'cotton'],
  },

  // Accessories - Curated Details
  {
    id: '9',
    name: 'Silk Scarf with Hand-Rolled Edges',
    description: 'Exquisite silk twill scarf featuring an original botanical print inspired by English gardens. Each piece is carefully printed using traditional techniques and finished with hand-rolled edges for the ultimate luxury touch. Versatile styling options make this an essential accessory for any sophisticated wardrobe.',
    price: 98.00,
    image: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698d?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
    colors: ['Botanical Green', 'Midnight Navy', 'Vintage Rose'],
    sizes: ['90cm x 90cm'],
    brand: 'Maison Écharpe',
    rating: 4.6,
    reviewCount: 23,
    tags: ['scarf', 'silk', 'botanical', 'luxury', 'hand-rolled'],
  },
  {
    id: '10',
    name: 'Minimalist Leather Crossbody Bag',
    description: 'Clean-lined crossbody bag crafted from vegetable-tanned leather that develops a beautiful patina over time. The minimalist design features a magnetic closure, interior pocket, and adjustable strap. Perfect size for essentials while maintaining an elegant silhouette. Handcrafted by artisans using traditional techniques.',
    price: 165.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
    colors: ['Tan', 'Black', 'Deep Brown'],
    sizes: ['One Size'],
    brand: 'Artisan Leather Co',
    rating: 4.8,
    reviewCount: 35,
    tags: ['bag', 'crossbody', 'leather', 'minimalist', 'handcrafted'],
  },

  // Jewelry - Delicate Luxuries
  {
    id: '11',
    name: 'Delicate Gold Chain Necklace',
    description: 'Timeless 14k gold chain necklace featuring delicate curb links for subtle elegance. Each link is carefully soldered and polished to perfection. The versatile length works beautifully alone or layered with other pieces. Includes a secure lobster clasp and comes in a luxury gift box.',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&h=500&fit=crop',
    category: 'Jewelry',
    inStock: true,
    colors: ['14k Gold', 'Rose Gold'],
    sizes: ['16"', '18"', '20"'],
    brand: 'Aurelius Fine Jewelry',
    rating: 4.9,
    reviewCount: 67,
    tags: ['necklace', 'gold', 'chain', '14k', 'delicate'],
  },
  {
    id: '12',
    name: 'Statement Pearl Drop Earrings',
    description: 'Elegant freshwater pearl drop earrings that add sophistication to any ensemble. Each baroque pearl is unique in shape and luster, suspended from 14k gold ear wires. The organic beauty of the pearls creates movement and catches light beautifully. Perfect for special occasions or elevating everyday looks.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    category: 'Jewelry',
    inStock: true,
    colors: ['White Pearl', 'Cream Pearl'],
    sizes: ['One Size'],
    brand: 'Oceanic Pearls',
    rating: 4.7,
    reviewCount: 29,
    tags: ['earrings', 'pearl', 'drop', 'freshwater', 'gold'],
  },

  // Summer Essentials
  {
    id: '13',
    name: 'Linen Blend Relaxed Shirt',
    description: 'Breezy linen blend shirt perfect for warm weather styling. The relaxed fit and breathable fabric ensure comfort during the hottest days, while the classic collar and button-front design maintain a polished appearance. Features functional chest pocket and mother-of-pearl buttons.',
    price: 78.00,
    image: 'https://images.unsplash.com/photo-1564257577-6a2a0722b8b8?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['White', 'Sage Green', 'Dusty Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    brand: 'Coastal Comfort',
    rating: 4.4,
    reviewCount: 33,
    tags: ['shirt', 'linen', 'summer', 'relaxed', 'breathable'],
  },
  {
    id: '14',
    name: 'Woven Straw Sun Hat',
    description: 'Handwoven straw sun hat providing style and sun protection. The wide brim creates flattering shadows while the adjustable inner band ensures a perfect fit. Features a grosgrain ribbon band and packable design for travel. Essential for beach days, garden parties, or any outdoor adventure.',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
    colors: ['Natural Straw', 'Black Band'],
    sizes: ['Small', 'Medium', 'Large'],
    brand: 'Sunbrim Artisans',
    rating: 4.5,
    reviewCount: 18,
    tags: ['hat', 'straw', 'sun protection', 'woven', 'summer'],
  },

  // Sale Items
  {
    id: '15',
    name: 'Vintage-Inspired Denim Jacket',
    description: 'Classic denim jacket with vintage-inspired wash and authentic details. Features contrast stitching, chest pockets with button flaps, and a slightly cropped silhouette. The medium-weight denim is pre-washed for softness and comfort. A timeless piece that works with everything from dresses to jeans.',
    price: 89.00,
    salePrice: 62.30,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Medium Wash', 'Dark Wash'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    brand: 'Vintage Revival',
    rating: 4.3,
    reviewCount: 24,
    tags: ['jacket', 'denim', 'vintage', 'cropped', 'classic'],
    isSale: true,
  },
  {
    id: '16',
    name: 'Ribbed Knit Cardigan',
    description: 'Cozy ribbed knit cardigan in a soft wool blend. The open-front design and relaxed fit make it perfect for layering over tanks, tees, or dresses. Features dropped shoulders and side pockets for a casual yet put-together look. Available in versatile neutral tones.',
    price: 95.00,
    salePrice: 66.50,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    category: "Women's Clothing",
    inStock: true,
    colors: ['Oatmeal', 'Charcoal', 'Dusty Rose'],
    sizes: ['XS', 'S', 'M', 'L'],
    brand: 'Knit & Cozy',
    rating: 4.6,
    reviewCount: 41,
    tags: ['cardigan', 'knit', 'wool', 'cozy', 'layering'],
    isSale: true,
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(product => 
    product.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchProducts(query: string): Product[] {
  const searchQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery) ||
    product.brand?.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isNew || product.isSale);
}

export function getSaleProducts(): Product[] {
  return products.filter(product => product.isSale);
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.isNew);
}
