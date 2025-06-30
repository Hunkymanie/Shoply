'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SearchFilters } from '@/hooks/useSearch';

interface ProductFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onReset: () => void;
  filterOptions: {
    categories: string[];
    colors: string[];
    sizes: string[];
    brands: string[];
  };
  resultCount: number;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-2 h-auto text-sm md:text-base">
          <span className="font-medium">{title}</span>
          {isOpen ? <ChevronUp className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 p-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProductFilters({ 
  filters, 
  onFiltersChange, 
  onReset, 
  filterOptions,
  resultCount 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = 
    filters.category ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.inStock ||
    filters.isNew ||
    filters.isSale ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  const toggleArrayFilter = (
    currentArray: string[],
    value: string,
    key: 'colors' | 'sizes' | 'brands'
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    onFiltersChange({ [key]: newArray });
  };

  return (
    <div className="border rounded-lg bg-card">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm"
        >
          <Filter className="h-3 w-3 md:h-4 md:w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {[
                filters.category && 1,
                filters.colors.length,
                filters.sizes.length,
                filters.brands.length,
                filters.inStock && 1,
                filters.isNew && 1,
                filters.isSale && 1,
                (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && 1
              ].filter(Boolean).reduce((a, b) => (a as number) + (b as number), 0)}
            </Badge>
          )}
        </Button>
        <span className="text-xs md:text-sm text-muted-foreground">
          {resultCount} products
        </span>
      </div>

      {/* Filter Content */}
      <div className={`p-3 md:p-4 space-y-3 md:space-y-4 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Sort */}
        <div className="space-y-2">
          <Label className="text-sm md:text-base">Sort by</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFiltersChange({ sortBy: value as SearchFilters['sortBy'] })}
          >
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters */}
        <FilterSection title="Quick Filters">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => onFiltersChange({ inStock: !!checked })}
              />
              <Label htmlFor="inStock" className="text-sm md:text-base">In Stock Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={filters.isNew}
                onCheckedChange={(checked) => onFiltersChange({ isNew: !!checked })}
              />
              <Label htmlFor="isNew" className="text-sm md:text-base">New Arrivals</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSale"
                checked={filters.isSale}
                onCheckedChange={(checked) => onFiltersChange({ isSale: !!checked })}
              />
              <Label htmlFor="isSale" className="text-sm md:text-base">On Sale</Label>
            </div>
          </div>
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category">
          <Select
            value={filters.category}
            onValueChange={(value) => onFiltersChange({ category: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {filterOptions.categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3 md:space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ priceRange: value as [number, number] })}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Colors */}
        {filterOptions.colors.length > 0 && (
          <FilterSection title="Colors">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {filterOptions.colors.map(color => (
                <button
                  key={color}
                  onClick={() => toggleArrayFilter(filters.colors, color, 'colors')}
                  className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs border transition-colors ${
                    filters.colors.includes(color)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-muted'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Sizes */}
        {filterOptions.sizes.length > 0 && (
          <FilterSection title="Sizes">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {filterOptions.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleArrayFilter(filters.sizes, size, 'sizes')}
                  className={`px-2 py-1 md:px-3 md:py-1 rounded border transition-colors text-xs md:text-sm ${
                    filters.sizes.includes(size)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-muted'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Brands */}
        {filterOptions.brands.length > 0 && (
          <FilterSection title="Brands">
            <div className="space-y-2">
              {filterOptions.brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => toggleArrayFilter(filters.brands, brand, 'brands')}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-xs md:text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full flex items-center gap-2 text-sm md:text-base"
          >
            <X className="h-3 w-3 md:h-4 md:w-4" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
