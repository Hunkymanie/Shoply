'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling edit
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const success = await updateProfile(formData);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock order data - in a real app, this would come from an API
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-12-15',
      status: 'delivered',
      total: 129.99,
      items: [
        { name: 'Classic Cotton T-Shirt', quantity: 2, price: 29.99 },
        { name: 'Denim Jeans', quantity: 1, price: 69.99 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-10',
      status: 'shipped',
      total: 89.99,
      items: [
        { name: 'Summer Dress', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-05',
      status: 'processing',
      total: 199.99,
      items: [
        { name: 'Winter Coat', quantity: 1, price: 199.99 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-3 md:mb-4"></div>
          <p className="text-sm md:text-base text-muted-foreground">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect to auth page
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your profile and view your orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center p-4 md:p-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <CardTitle className="text-base md:text-lg">{user.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <Mail className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="truncate">{user.email}</span>
                  </CardDescription>
                  {user.emailVerified && (
                    <Badge className="w-fit mx-auto mt-2 bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-2 p-4 md:p-6">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm md:text-base"
                    onClick={() => setIsEditing(true)}
                  >
                    <Settings className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm md:text-base"
                    onClick={() => router.push('/wishlist')}
                  >
                    <Heart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm md:text-base"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Profile Information */}
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6">
                  <div>
                    <CardTitle className="text-base md:text-lg">Profile Information</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Update your account details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={handleEditToggle} size="sm" className="text-xs md:text-sm">
                      <Edit className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditToggle}
                        disabled={isUpdating}
                        className="text-xs md:text-sm"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="text-xs md:text-sm"
                      >
                        <Save className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {isUpdating ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs md:text-sm">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className={`text-sm md:text-base ${!isEditing ? 'bg-muted' : ''}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs md:text-sm">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className={`text-sm md:text-base ${!isEditing ? 'bg-muted' : ''}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className={`text-sm md:text-base ${!isEditing ? 'bg-muted' : ''}`}
                      placeholder="Add your phone number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order History */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg">Order History</CardTitle>
                  <CardDescription className="text-xs md:text-sm">View your recent purchases</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {mockOrders.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                      <Package className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">No orders yet</p>
                      <Button onClick={() => router.push('/products')} className="text-sm md:text-base">
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <span className="font-medium text-sm md:text-base">Order {order.id}</span>
                              </div>
                              <Badge className={`${getStatusColor(order.status)} text-xs`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-medium text-sm md:text-base">${order.total}</p>
                              <p className="text-xs md:text-sm text-muted-foreground">{order.date}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <p key={index} className="text-xs md:text-sm text-muted-foreground">
                                {item.quantity}x {item.name} - ${item.price}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}