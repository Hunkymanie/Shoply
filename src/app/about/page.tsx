import { Store, Users, Award, Truck, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Available', value: '10K+', icon: Store },
    { label: 'Years of Experience', value: '5+', icon: Award },
    { label: 'Countries Served', value: '25+', icon: Truck },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We live and breathe fashion, constantly seeking the latest trends and timeless pieces that speak to your unique style.',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product is carefully curated and tested to ensure it meets our high standards for quality, comfort, and durability.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide exceptional service and support to make your shopping experience memorable.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              About Shoply
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-primary-foreground/80 leading-relaxed">
              Your trusted fashion destination, bringing style, quality, and exceptional service 
              to fashion enthusiasts worldwide since 2020.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our Story
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                Founded in 2020 with a simple mission: to make high-quality, stylish fashion 
                accessible to everyone. What started as a small online boutique has grown into 
                a global fashion destination, serving customers in over 25 countries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Fashion Forward Thinking
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  We believe fashion is more than just clothing—it's a form of self-expression, 
                  confidence, and creativity. Our team of fashion experts travels the world to 
                  discover emerging designers, sustainable brands, and timeless pieces that 
                  complement your lifestyle.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Every item in our collection is carefully selected for its quality, design, 
                  and versatility. We partner with responsible manufacturers who share our 
                  commitment to ethical production and sustainable practices.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 md:p-8 text-center">
                <Store className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-3 md:mb-4" />
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Global Reach, Personal Touch
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  From our headquarters to your doorstep, we maintain the personal touch 
                  that makes shopping with us special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Our Values
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do, from product selection to customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Ready to Discover Your Style?
            </h2>
            <p className="text-base md:text-xl text-primary-foreground/80 mb-6 md:mb-8">
              Join thousands of fashion lovers who trust Shoply for their style needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-sm md:text-base">
                <Link href="/products">
                  Shop Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary text-sm md:text-base">
                <Link href="/account">
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
