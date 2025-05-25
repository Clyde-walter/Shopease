
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

export function AdminCollections() {
  const [collections, setCollections] = useState([
    {
      id: '1',
      name: 'Summer Collection',
      description: 'Fresh summer styles for the season',
      productCount: 12,
      image: '/placeholder.svg',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Winter Collection',
      description: 'Cozy winter essentials',
      productCount: 8,
      image: '/placeholder.svg',
      status: 'Active'
    }
  ]);

  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionForm, setCollectionForm] = useState({
    name: '',
    description: '',
    image: '/placeholder.svg'
  });

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      ...collectionForm,
      id: editingCollection ? editingCollection.id : Date.now().toString(),
      productCount: editingCollection ? editingCollection.productCount : 0,
      status: 'Active'
    };

    if (editingCollection) {
      setCollections(collections.map(c => 
        c.id === editingCollection.id ? collectionData : c
      ));
      toast({
        title: "Collection updated successfully!"
      });
    } else {
      setCollections([...collections, collectionData]);
      toast({
        title: "Collection created successfully!"
      });
    }

    resetForm();
    setIsCollectionDialogOpen(false);
  };

  const resetForm = () => {
    setCollectionForm({
      name: '',
      description: '',
      image: '/placeholder.svg'
    });
    setEditingCollection(null);
  };

  const handleEdit = (collection: any) => {
    setEditingCollection(collection);
    setCollectionForm({
      name: collection.name,
      description: collection.description,
      image: collection.image
    });
    setIsCollectionDialogOpen(true);
  };

  const handleDelete = (collectionId: string) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(c => c.id !== collectionId));
      toast({
        title: "Collection deleted successfully!"
      });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Collections Management</h1>
        <p className="text-gray-600">Create and manage product collections</p>
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
          <DialogContent className="max-w-md">
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
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-12 h-12 object-cover rounded"
                      />
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
