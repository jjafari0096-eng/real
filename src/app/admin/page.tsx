'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { properties as initialProperties } from '@/data/properties';
import { Property } from '@/types/property';
import { Save, Edit, X, Plus, Trash2, Upload, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface PropertyTypeOption {
  id: string;
  slug: string;
  label: string;
}

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Property | null>(null);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [isNewProperty, setIsNewProperty] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeOption[]>([]);

  // Load property types from localStorage
  useEffect(() => {
    const savedTypes = localStorage.getItem('property_types');
    if (savedTypes) {
      setPropertyTypes(JSON.parse(savedTypes));
    } else {
      const defaultTypes = [
        { id: '1', slug: 'apartment', label: 'Apartment' },
        { id: '2', slug: 'villa', label: 'Villa' },
        { id: '3', slug: 'penthouse', label: 'Penthouse' },
        { id: '4', slug: 'commercial', label: 'Commercial' },
      ];
      setPropertyTypes(defaultTypes);
    }
  }, []);

  // Calculate unread messages count
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const count = messages.filter((m: any) => !m.isRead).length;
    setUnreadMessages(count);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('admin_properties', JSON.stringify(properties));
  }, [properties]);

  const handleEdit = (property: Property) => {
    setEditingId(property.id);
    setEditForm({ ...property });
    setIsNewProperty(false);
    setSaveMessage('');
  };

  const handleSave = () => {
    if (editForm) {
      if (isNewProperty) {
        setProperties([...properties, editForm]);
      } else {
        setProperties(properties.map(p => p.id === editForm.id ? editForm : p));
      }
      setEditingId(null);
      setEditForm(null);
      setSaveMessage('✅ Changes saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    setIsNewProperty(false);
  };

  const handleAddNew = () => {
    const newProperty: Property = {
      id: Date.now().toString(),
      slug: 'new-property',
      title: 'New Property',
      type: 'apartment',
      status: 'for-sale',
      price: 1000000,
      currency: 'USD',
      location: { city: 'Paris', region: 'France', lat: 48.8566, lng: 2.3522 },
      specs: { bedrooms: 3, bathrooms: 2, areaM2: 150 },
      gallery: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', alt: 'New Property' }],
      description: 'Add your property description here',
      amenities: ['Parking', 'Elevator'],
      featured: true
    };
    setEditingId(newProperty.id);
    setEditForm(newProperty);
    setIsNewProperty(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      setProperties(properties.filter(p => p.id !== id));
      setSaveMessage('✅ Property deleted successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateFormField = (field: string, value: any, parent?: string) => {
    if (!editForm) return;
    
    if (parent) {
      setEditForm({
        ...editForm,
        [parent]: {
          ...(editForm as any)[parent],
          [field]: value
        }
      });
    } else {
      setEditForm({
        ...editForm,
        [field]: value
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-2">Property Management Dashboard</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage all {properties.length} properties on your website</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link 
              href="/admin/messages"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors relative"
            >
              <MessageSquare size={20} />
              Manage Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Link>
            <button
              onClick={handleAddNew}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add New Property
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        {saveMessage && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Properties Grid / Edit Form */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gray-800 rounded-xl shadow-sm overflow-hidden ${
                editingId === property.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {editingId === property.id && editForm ? (
                /* Edit Mode */
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{isNewProperty ? 'Add New Property' : 'Edit Property'}</h3>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Property Title</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => updateFormField('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                      />
                    </div>

                    {/* Price & Currency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => updateFormField('price', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
                        <select
                          value={editForm.currency}
                          onChange={(e) => updateFormField('currency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                        <input
                          type="text"
                          value={editForm.location.city}
                          onChange={(e) => updateFormField('city', e.target.value, 'location')}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Region</label>
                        <input
                          type="text"
                          value={editForm.location.region}
                          onChange={(e) => updateFormField('region', e.target.value, 'location')}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    {/* Type & Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Property Type</label>
                        <select
                          value={editForm.type}
                          onChange={(e) => updateFormField('type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        >
                          {propertyTypes.map((type) => (
                            <option key={type.id} value={type.slug}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <select
                          value={editForm.status}
                          onChange={(e) => updateFormField('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        >
                          <option value="for-sale">For Sale</option>
                          <option value="for-rent">For Rent</option>
                        </select>
                      </div>
                    </div>

                    {/* Main Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Main Image URL</label>
                      <input
                        type="text"
                        value={editForm.gallery[0]?.url}
                        onChange={(e) => {
                          const newGallery = [...editForm.gallery];
                          if (newGallery[0]) {
                            newGallery[0].url = e.target.value;
                          } else {
                            newGallery.push({ url: e.target.value, alt: e.target.value });
                          }
                          setEditForm({ ...editForm, gallery: newGallery });
                        }}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        placeholder="https://..."
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => updateFormField('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      />
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={editForm.featured}
                        onChange={(e) => updateFormField('featured', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-300 mb-1">Show in Featured Listings</label>
                    </div>

                    {/* Image Upload Field */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Main Property Image</label>
                      
                      {/* Upload from local device */}
                      <div className="flex items-center gap-3 mb-3">
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                          <Upload size={18} />
                          Upload from device
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && editForm) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const base64 = event.target?.result as string;
                                  const newGallery = [...(editForm.gallery || [])];
                                  if (newGallery.length > 0) {
                                    newGallery[0] = { ...newGallery[0], url: base64 };
                                  } else {
                                    newGallery.push({ url: base64, alt: editForm.title });
                                  }
                                  setEditForm({ ...editForm, gallery: newGallery });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <span className="text-gray-500">or</span>
                        {/* Enter URL directly */}
                        <input
                          type="text"
                          value={editForm?.gallery?.[0]?.url?.startsWith('data:') ? '' : (editForm?.gallery?.[0]?.url || '')}
                          onChange={(e) => {
                            if (editForm) {
                              const newGallery = [...(editForm.gallery || [])];
                              if (newGallery.length > 0) {
                                newGallery[0] = { ...newGallery[0], url: e.target.value };
                              } else {
                                newGallery.push({ url: e.target.value, alt: editForm.title });
                              }
                              setEditForm({ ...editForm, gallery: newGallery });
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                          placeholder="Add image URL..."
                        />
                      </div>

                      {/* Image Preview */}
                      {editForm?.gallery?.[0]?.url && (
                        <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                          <p className="text-xs text-gray-400 mb-2">🖼️ Image Preview:</p>
                          <img 
                            src={editForm.gallery[0].url} 
                            alt="Preview" 
                            className="w-full max-w-md h-48 object-cover rounded-lg mx-auto"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          {editForm.gallery[0].url.startsWith('data:') && (
                            <p className="text-xs text-green-400 mt-2 text-center">✅ Image uploaded from your device</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={handleSave}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={property.gallery[0]?.url}
                      alt={property.title}
                      className="w-full h-full object-cover min-h-[200px]"
                    />
                  </div>
                  <div className="w-2/3 p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          property.status === 'for-sale' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                        </span>
                        {property.featured && (
                          <span className="ml-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">Featured</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{property.location.city}, {property.location.region}</p>
                    <p className="text-xl font-bold text-blue-400 mb-3">
                      {property.price.toLocaleString()} {property.currency}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{property.specs.bedrooms} beds</span>
                      <span>{property.specs.bathrooms} baths</span>
                      <span>{property.specs.areaM2} m²</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Guide Section */}
        <div className="mt-12 bg-blue-900/30 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-serif mb-4 text-white">📖 Admin Dashboard Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-lg mb-2">✏️ Edit Properties</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Click the edit button (pencil icon) to open the edit form</li>
                <li>All fields including title, price, city, description and image can be modified</li>
                <li>Click "Save Changes" after making your edits</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">➕ Add New Property</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Click the "Add New Property" button at the top of the page</li>
                <li>Fill in all the property details in the form</li>
                <li>Keep the "Featured" checkbox enabled to show it on the homepage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🖼️ Update Images</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Enter a new image URL in the "Main Image URL" field</li>
                <li>You can use images from any image hosting service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">💾 Data Storage</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Changes are automatically saved in your browser's localStorage</li>
                <li>Your changes will persist even if you close the browser</li>
                <li>This can be connected to a real database for permanent deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}