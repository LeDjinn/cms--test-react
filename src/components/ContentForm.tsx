import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Collection, Field } from '../types/cms';

const ContentForm: React.FC = () => {
  const { collections, addContentItem } = useCMS();
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(e.target.value);
    setFormData({});
  };

  const handleInputChange = (field: Field, value: any) => {
    setFormData({ ...formData, [field.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCollection) {
      addContentItem(selectedCollection, formData);
      setFormData({});
    }
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={formData[field.name] || false}
            onChange={(e) => handleInputChange(field, e.target.checked)}
            required={field.required}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
          Select Collection
        </label>
        <select
          id="collection"
          value={selectedCollection}
          onChange={handleCollectionChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Select a collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCollection && (
        <>
          {collections
            .find((c) => c.id === selectedCollection)
            ?.fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.name}
                </label>
                {renderField(field)}
              </div>
            ))}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Content
          </button>
        </>
      )}
    </form>
  );
};

export default ContentForm;