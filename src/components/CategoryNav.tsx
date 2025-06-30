'use client';

import Link from 'next/link';
import { getAllCategories } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  User, 
  Users, 
  Footprints, 
  Watch, 
  Gem, 
  Dumbbell,
  Shirt,
  Sparkles,
  Percent,
  Sun
} from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Women's Clothing": User,
  "Men's Clothing": Users,
  'Shoes': Footprints,
  'Accessories': Watch,
  'Jewelry': Gem,
  'Activewear': Dumbbell,
  'Outerwear': Shirt,
};

interface CategoryNavProps {
  selectedCategory?: string;
  onCategorySelect: (category: string | undefined) => void;
}

export default function CategoryNav({ selectedCategory, onCategorySelect }: CategoryNavProps) {
  const categories = getAllCategories();

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {/* Main Category Filters */}
          <Badge
            variant={!selectedCategory ? "default" : "secondary"}
            className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onCategorySelect(undefined)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            All Products
          </Badge>
          
          {/* Collection Links */}
          <Link href="/collections/new-arrivals">
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors border-primary/50 text-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              New Arrivals
            </Badge>
          </Link>
          
          <Link href="/collections/sale">
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors border-accent/50 text-accent"
            >
              <Percent className="w-4 h-4 mr-2" />
              Sale
            </Badge>
          </Link>
          
          <Link href="/collections/summer-essentials">
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors border-primary/30 text-primary/80"
            >
              <Sun className="w-4 h-4 mr-2" />
              Summer
            </Badge>
          </Link>
          
          {/* Category Filters */}
          {categories.map((category) => {
            const IconComponent = categoryIcons[category] || ShoppingBag;
            return (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onCategorySelect(category)}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
