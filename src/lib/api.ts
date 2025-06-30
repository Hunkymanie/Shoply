// API service for fetching real product data from DummyJSON
const API_BASE_URL = 'https://dummyjson.com';

// Add timeout to fetch requests
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout: number = 5000): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  reviews?: Review[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

// Fetch all products with pagination
export async function fetchProducts(
  limit: number = 30,
  skip: number = 0,
  category?: string
): Promise<ProductsResponse> {
  try {
    let url = `${API_BASE_URL}/products`;
    
    if (category) {
      url = `${API_BASE_URL}/products/category/${category}`;
    }
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    
    const response = await fetchWithTimeout(`${url}?${params}`, {}, 5000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProduct(id: string | number): Promise<Product> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, {}, 5000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Search products
export async function searchProducts(
  query: string,
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      skip: skip.toString(),
    });
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/search?${params}`, {}, 5000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/categories`, {}, 5000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Fetch products by category
export async function fetchProductsByCategory(
  category: string,
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/category/${category}?${params}`, {}, 5000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}

// Helper function to get discounted price
export function getDiscountedPrice(price: number, discountPercentage?: number): number {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
}

// Helper function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Helper function to get stock status
export function getStockStatus(stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  return 'In Stock';
}

// Map DummyJSON categories to our fashion-focused categories
export const categoryMapping: Record<string, string> = {
  'womens-dresses': 'Women\'s Clothing',
  'womens-shoes': 'Women\'s Shoes',
  'womens-bags': 'Women\'s Bags',
  'womens-jewellery': 'Women\'s Jewelry',
  'womens-watches': 'Women\'s Watches',
  'mens-shirts': 'Men\'s Clothing',
  'mens-shoes': 'Men\'s Shoes',
  'mens-watches': 'Men\'s Watches',
  'tops': 'Tops',
  'sunglasses': 'Sunglasses',
  'beauty': 'Beauty',
  'fragrances': 'Fragrances',
  'skin-care': 'Skincare',
};

// Get fashion-related categories
export function getFashionCategories(): string[] {
  return Object.keys(categoryMapping);
}
