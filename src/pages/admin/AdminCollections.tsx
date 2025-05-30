
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Search, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { useStore } from '@/contexts/StoreContext';

export function AdminCollections() {
  const { collections, addCollection, updateCollection, deleteCollection } = useStore();
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionForm, setCollectionForm] = useState({
    name: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop']
  });

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).slice(0, 5).map(file => {
        return URL.createObjectURL(file);
      });
      
      const updatedImages = [...collectionForm.images.filter(img => !img.includes('unsplash')), ...newImages].slice(0, 5);
      setCollectionForm({...collectionForm, images: updatedImages.length > 0 ? updatedImages : ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop']});
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = collectionForm.images.filter((_, i) => i !== index);
    setCollectionForm({...collectionForm, images: updatedImages.length > 0 ? updatedImages : ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop']});
  };

  const handleCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!collectionForm.name || !collectionForm.description) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const collectionData = {
      name: collectionForm.name,
      description: collectionForm.description,
      images: collectionForm.images,
      productCount: editingCollection ? editingCollection.productCount : 0,
      status: 'Active' as const
    };

    if (editingCollection) {
      updateCollection(editingCollection.id, collectionData);
      toast({
        title: "Collection updated successfully!",
        description: "Changes are now live across the store."
      });
    } else {
      addCollection(collectionData);
      toast({
        title: "Collection created successfully!",
        description: "New collection is now available in the store."
      });
    }

    resetForm();
    setIsCollectionDialogOpen(false);
  };

  const resetForm = () => {
    setCollectionForm({
      name: '',
      description: '',
      images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop']
    });
    setEditingCollection(null);
  };

  const handleEdit = (collection: any) => {
    setEditingCollection(collection);
    setCollectionForm({
      name: collection.name,
      description: collection.description,
      images: collection.images || ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop']
    });
    setIsCollectionDialogOpen(true);
  };

  const handleDelete = (collectionId: string) => {
    if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
      deleteCollection(collectionId);
      toast({
        title: "Collection deleted successfully!",
        description: "Collection has been removed from the store."
      });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Collections Management</h1>
        <p className="text-gray-600">Create and manage product collections - changes update immediately across the store</p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCollection ? 'Edit Collection' : 'Create New Collection'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCollectionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Collection Name *</label>
                <Input
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({...collectionForm, name: e.target.value})}
                  placeholder="Enter collection name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({...collectionForm, description: e.target.value})}
                  placeholder="Enter collection description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Collection Images (Up to 5)</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="collection-image-upload"
                    />
                    <label htmlFor="collection-image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </span>
                      </Button>
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {collectionForm.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Collection ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        {collectionForm.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingCollection ? 'Update Collection' : 'Create Collection'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Collections ({filteredCollections.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {collection.images.slice(0, 3).map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={collection.name}
                            className="w-10 h-10 object-cover rounded border-2 border-white"
                          />
                        ))}
                        {collection.images.length > 3 && (
                          <div className="w-10 h-10 bg-gray-200 rounded border-2 border-white flex items-center justify-center text-xs">
                            +{collection.images.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{collection.name}</div>
                        <div className="text-sm text-gray-500">{collection.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{collection.productCount} products</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 text-white">
                      {collection.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(collection)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(collection.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
