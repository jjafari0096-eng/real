'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface PropertyType {
  id: string;
  slug: string;
  label: string;
  icon?: string;
  description?: string;
  count: number; // Number of properties of this type displayed on the site
}

export default function PropertyTypesPage() {
  const defaultTypes: PropertyType[] = [
    { id: '1', slug: 'apartment', label: 'Apartment', description: 'Residential units in apartment buildings', count: 12 },
    { id: '2', slug: 'villa', label: 'Villa', description: 'Independent private houses with garden and yard', count: 8 },
    { id: '3', slug: 'penthouse', label: 'Penthouse', description: 'Luxury large units on the top floor of buildings', count: 5 },
    { id: '4', slug: 'commercial', label: 'Commercial', description: 'Commercial spaces, offices and investment properties', count: 3 },
  ];

  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PropertyType | null>(null);
  const [isNewType, setIsNewType] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load property types from localStorage
  useEffect(() => {
    const savedTypes = localStorage.getItem('property_types');
    if (savedTypes) {
      setPropertyTypes(JSON.parse(savedTypes));
    } else {
      setPropertyTypes(defaultTypes);
      localStorage.setItem('property_types', JSON.stringify(defaultTypes));
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (propertyTypes.length > 0) {
      localStorage.setItem('property_types', JSON.stringify(propertyTypes));
    }
  }, [propertyTypes]);

  const handleEdit = (type: PropertyType) => {
    setEditingId(type.id);
    setEditForm({ ...type });
    setIsNewType(false);
    setSaveMessage('');
  };

  const handleSave = () => {
    if (editForm) {
      if (isNewType) {
        setPropertyTypes([...propertyTypes, editForm]);
      } else {
        setPropertyTypes(propertyTypes.map(t => t.id === editForm.id ? editForm : t));
      }
      setEditingId(null);
      setEditForm(null);
      setIsNewType(false);
      setSaveMessage('✅ Property type saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleAddNew = () => {
    const newType: PropertyType = {
      id: Date.now().toString(),
      slug: 'new-type',
      label: 'New Property Type',
      description: 'Write a description for this property type',
      count: 0
    };
    setEditingId(newType.id);
    setEditForm(newType);
    setIsNewType(true);
    setSaveMessage('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property type? This will affect existing properties!')) {
      setPropertyTypes(propertyTypes.filter(t => t.id !== id));
      setSaveMessage('✅ Property type deleted successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    setIsNewType(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Property Types Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage, edit, and add different types of properties</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          Add New Type
        </button>
      </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            {saveMessage}
          </div>
        )}

        {/* Edit/Create Form */}
        {editingId && editForm && (
          <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isNewType ? 'Add New Property Type' : 'Edit Property Type'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Example: Villa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Example: villa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Count</label>
                <input
                  type="number"
                  value={editForm.count || 0}
                  onChange={(e) => setEditForm({ ...editForm, count: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of properties of this type"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Write a short description about this property type"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Property Types List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {propertyTypes.map((type) => (
            <div
              key={type.id}
              className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{type.label}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block px-2 py-1 bg-gray-700 rounded text-xs text-gray-400">
                      {type.slug}
                    </span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-400">
                      {type.count} properties
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(type)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(type.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{type.description || 'No description added'}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {propertyTypes.length === 0 && !editingId && (
          <div className="text-center py-16 bg-gray-800 rounded-xl">
            <p className="text-gray-400 text-lg">No property types have been added yet</p>
            <button
              onClick={handleAddNew}
              className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add First Property Type
            </button>
          </div>
        )}
    </div>
  );
}