'use client';

import { products as staticProducts } from '@/lib/products';

export default function TestProducts() {
  console.log('Static products loaded:', staticProducts.length);
  console.log('First few products:', staticProducts.slice(0, 3));
  
  const accessories = staticProducts.filter(p => p.category === 'Accessories');
  console.log('Accessories found:', accessories.length);
  console.log('Accessories:', accessories);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Product Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Static Products Summary</h2>
        <p>Total products: {staticProducts.length}</p>
        <p>Accessories: {accessories.length}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Categories</h2>
        {Array.from(new Set(staticProducts.map(p => p.category))).map(category => (
          <div key={category} className="mb-2">
            <strong>{category}:</strong> {staticProducts.filter(p => p.category === category).length} products
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Accessories Products</h2>
        {accessories.map(product => (
          <div key={product.id} className="border p-4 mb-4 rounded">
            <h3 className="font-semibold">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
