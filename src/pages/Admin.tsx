
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';

export function Admin() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: '/placeholder.svg'
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price || !productForm.description || !productForm.category) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      description: productForm.description,
      category: productForm.category,
      stock: parseInt(productForm.stock) || 0,
      image: productForm.image
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({
        title: "Product updated successfully!"
      });
    } else {
      addProduct(productData);
      toast({
        title: "Product added successfully!"
      });
    }

    resetForm();
    setIsProductDialogOpen(false);
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      image: '/placeholder.svg'
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      stock: product.stock.toString(),
      image: product.image
    });
    setIsProductDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast({
        title: "Product deleted successfully!"
      });
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast({
      title: "Order status updated!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your products, orders, and store settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-purple-600">{totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Products Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products Management</CardTitle>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-ecommerce-600 hover:bg-ecommerce-700" onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name *</label>
                      <Input
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price *</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stock</label>
                      <Input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <Textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        placeholder="Enter product description"
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-ecommerce-600 hover:bg-ecommerce-700">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">${product.price} • Stock: {product.stock}</p>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders Management */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No orders yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <span className="font-semibold text-ecommerce-600">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
