# Copilot Instructions for Shoply E-commerce Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern e-commerce storefront called "Shoply" built with:
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Shadcn/ui** for components
- **Stripe** for payment processing

## Code Style Guidelines
- Use TypeScript for all new files
- Prefer functional components with hooks
- Use Tailwind CSS classes for styling
- Implement responsive designs (mobile-first)
- Follow Next.js App Router patterns
- Use Shadcn UI components when available

## Project Structure
- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/components/ui` - Shadcn UI components
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions

## E-commerce Features to Implement
- Product catalog with grid layout
- Product detail pages with dynamic routes
- Shopping cart functionality
- Stripe checkout integration
- Order success/failure pages
- Mobile-responsive design

## Key Libraries and APIs
- `@stripe/stripe-js` for client-side Stripe integration
- `stripe` for server-side Stripe operations
- Shadcn UI components for consistent styling
- Next.js API routes for backend functionality

## Best Practices
- Use environment variables for sensitive data (Stripe keys)
- Implement proper error handling
- Add loading states for better UX
- Use Next.js Image component for optimized images
- Implement proper SEO with metadata
- Follow accessibility best practices
