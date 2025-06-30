'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  brands: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export const defaultFilters: SearchFilters = {
  query: '',
  category: '',
  priceRange: [0, 1000],
  colors: [],
  sizes: [],
  brands: [],
  inStock: false,
  isNew: false,
  isSale: false,
  sortBy: 'name',
};

export function useSearch(products: Product[]) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        product.brand?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Price range filter
    result = result.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter(product => 
        product.colors?.some(color => filters.colors.includes(color))
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes?.some(size => filters.sizes.includes(size))
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => 
        product.brand && filters.brands.includes(product.brand)
      );
    }

    // Stock filter
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // New items filter
    if (filters.isNew) {
      result = result.filter(product => product.isNew);
    }

    // Sale items filter
    if (filters.isSale) {
      result = result.filter(product => product.isSale);
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [products, filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))];
    const colors = [...new Set(products.flatMap(p => p.colors || []))];
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))] as string[];

    return { categories, colors, sizes, brands };
  }, [products]);

  return {
    filters,
    filteredProducts,
    updateFilters,
    resetFilters,
    filterOptions,
    resultCount: filteredProducts.length,
  };
}
