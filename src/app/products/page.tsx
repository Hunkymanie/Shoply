'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, fetchProductsByCategory, searchProducts, getFashionCategories, categoryMapping, type Product as ApiProduct } from '@/lib/api';
import { products as staticProducts, getProductsByCategory } from '@/lib/products';
import { type Product } from '@/types';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useSearch, SearchFilters, defaultFilters } from '@/hooks/useSearch';
import ProductCard from '@/components/ProductCard';
import CategoryNav from '@/components/CategoryNav';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import CurrencyDemo from '@/components/CurrencyDemo';
import { SearchBar } from '@/components/SearchBar';
import { ProductFilters } from '@/components/ProductFilters';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

// Convert API product to our Product interface
const convertApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id.toString(),
  name: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  salePrice: apiProduct.discountPercentage ? 
    Math.round(apiProduct.price * (1 - apiProduct.discountPercentage / 100) * 100) / 100 : 
    undefined,
  image: apiProduct.thumbnail,
  category: categoryMapping[apiProduct.category] || apiProduct.category, // Map API category to display category
  inStock: apiProduct.stock > 0,
  brand: apiProduct.brand,
  rating: apiProduct.rating,
  reviewCount: apiProduct.reviews?.length || 0,
  tags: apiProduct.tags,
  isSale: !!apiProduct.discountPercentage,
  isNew: false,
  colors: ['Black', 'White', 'Gray'], // Default colors since API doesn't provide them
  sizes: ['S', 'M', 'L', 'XL'], // Default sizes since API doesn't provide them
});

function ProductsContent() {
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  
  // Use the search hook for filtering
  const { filteredProducts, filters, updateFilters, resetFilters } = useSearch(allProducts);
  
  // Generate filter options from all products
  const filterOptions = useMemo(() => {
    const categories = [...new Set(allProducts.map(p => p.category))].filter(Boolean);
    const colors = [...new Set(allProducts.flatMap(p => p.colors || []))].filter(Boolean);
    const sizes = [...new Set(allProducts.flatMap(p => p.sizes || []))].filter(Boolean);
    const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))].filter(Boolean) as string[];
    
    return { categories, colors, sizes, brands };
  }, [allProducts]);
  
  const productsPerPage = 12;
  
  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Load all products once on mount
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading products...');
      
      // Start with static products for instant display
      const allStaticProducts = [...staticProducts];
      setAllProducts(allStaticProducts); // Set immediately for faster UI
      setLoading(false); // Stop loading to show products
      
      console.log('Static products loaded:', allStaticProducts.length);
      
      // Fetch a limited set of API products in the background
      try {
        const fashionCategories = getFashionCategories();
        const limitedCategories = fashionCategories.slice(0, 2); // Only 2 categories
        
        const apiResults = await Promise.allSettled(
          limitedCategories.map(cat => 
            fetchProductsByCategory(cat, 3, 0) // Only 3 products per category
          )
        );
        
        const apiProducts = apiResults
          .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
          .reduce((acc, result) => {
            return [...acc, ...result.value.products.map(convertApiProductToProduct)];
          }, [] as Product[]);
        
        if (apiProducts.length > 0) {
          console.log('API products loaded:', apiProducts.length);
          const combinedProducts = [...allStaticProducts, ...apiProducts];
          
          // Remove duplicates
          const uniqueProducts = combinedProducts.filter((product, index, self) => 
            index === self.findIndex(p => p.id === product.id)
          );
          
          setAllProducts(uniqueProducts);
        }
      } catch (apiError) {
        console.log('API fetch failed, using static products only:', apiError);
      }
      
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
      // Fallback to static products
      setAllProducts(staticProducts);
      setLoading(false);
    }
  };

  // Load products on mount
  useEffect(() => {
    loadAllProducts();
  }, []);

  // Handle URL parameters on mount and when search params change
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    
    // Only update state if it's different from current state
    if (urlCategory !== currentCategory) {
      setCurrentCategory(urlCategory);
    }
    
    // Update filters based on URL parameters, but avoid infinite loops
    const newFilters: Partial<SearchFilters> = {};
    let shouldUpdate = false;
    
    if (urlCategory && urlCategory !== filters.category) {
      newFilters.category = urlCategory;
      shouldUpdate = true;
    } else if (!urlCategory && filters.category) {
      newFilters.category = '';
      shouldUpdate = true;
    }
    
    if (urlSearch && urlSearch !== filters.query) {
      newFilters.query = urlSearch;
      shouldUpdate = true;
    } else if (!urlSearch && filters.query) {
      newFilters.query = '';
      shouldUpdate = true;
    }
    
    if (shouldUpdate) {
      updateFilters(newFilters);
    }
  }, [searchParams]); // Only depend on searchParams to avoid infinite loops

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    // Prevent unnecessary updates if category is the same
    if (category === currentCategory) return;
    
    setCurrentCategory(category);
    setCurrentPage(1);
    
    // Only update filters if the category is actually different
    const newCategory = category || '';
    if (newCategory !== filters.category) {
      updateFilters({ category: newCategory });
    }
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    // Prevent unnecessary updates if query is the same
    if (query === filters.query) return;
    
    setCurrentPage(1);
    updateFilters({ query });
    
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: Partial<SearchFilters>) => {
    setCurrentPage(1);
    updateFilters(newFilters);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setCurrentPage(1);
    resetFilters();
    setCurrentCategory(null);
    
    // Clear URL parameters
    window.history.pushState(null, '', window.location.pathname);
  };

  const breadcrumbItems = [
    { label: 'Products' },
    ...(currentCategory ? [{ label: currentCategory }] : []),
    ...(filters.query ? [{ label: `"${filters.query}"` }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-3" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Our Collection
            </h1>
            <p className="text-muted-foreground">
              Discover fashion that speaks to your unique style
            </p>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden mt-6">
            <SearchBar
              value={filters.query}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </div>
        </div>
      </div>

      <CategoryNav 
        selectedCategory={currentCategory || undefined}
        onCategorySelect={(category) => handleCategoryChange(category || null)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div className="bg-card rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Filter Products</h3>
                  <SearchBar
                    value={filters.query}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="mb-4"
                  />
                  
                  {/* Currency Switcher */}
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-medium mb-3 text-foreground">Currency</h4>
                    <CurrencySwitcher variant="inline" showRate={true} />
                    {currency === 'NGN' && (
                      <p className="text-xs text-muted-foreground mt-2">
                        🇳🇬 Prices shown in Nigerian Naira
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Advanced Filters */}
                <ProductFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                  filterOptions={filterOptions}
                  resultCount={filteredProducts.length}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              {showFilters && (
                <div className="mt-4 bg-card rounded-lg border border-border">
                  <div className="p-4 border-b border-border">
                    <SearchBar
                      value={filters.query}
                      onChange={handleSearch}
                      placeholder="Search products..."
                      className="mb-4"
                    />
                    <div className="border-t border-border pt-4">
                      <CurrencySwitcher variant="inline" showRate={true} />
                    </div>
                  </div>
                  
                  <ProductFilters 
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleResetFilters}
                    filterOptions={filterOptions}
                    resultCount={filteredProducts.length}
                  />
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {filters.query && `Results for "${filters.query}"`}
                {currentCategory && !filters.query && currentCategory}
                {!filters.query && !currentCategory && 'All Products'}
              </h2>
              <div className="text-sm text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
            </div>

            {/* Currency Demo */}
            <CurrencyDemo />

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-destructive font-medium mb-4">{error}</p>
                  <Button 
                    onClick={loadAllProducts}
                    variant="outline"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {paginatedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <div key={product.id} className="h-full">
                        <ProductCard 
                          product={product}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="bg-muted/20 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                        <Filter className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">No products found</h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your filters or search query
                      </p>
                      <Button onClick={handleResetFilters} variant="outline">
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>}>
      <ProductsContent />
    </Suspense>
  );
}
