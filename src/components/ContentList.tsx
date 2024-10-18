import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Trash2 } from 'lucide-react';

const ContentList: React.FC = () => {
  const { collections, getContentItems, removeContentItem } = useCMS();
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(e.target.value);
  };

  const contentItems = selectedCollection ? getContentItems(selectedCollection) : [];
  const selectedCollectionFields = collections.find(c => c.id === selectedCollection)?.fields || [];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Items</h2>
      <select
        value={selectedCollection}
        onChange={handleCollectionChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Select a collection</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
      {selectedCollection && contentItems.length === 0 ? (
        <p className="mt-4 text-gray-600">No content items in this collection.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {contentItems.map((item) => (
            <li key={item.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  {selectedCollectionFields.map((field) => (
                    <p key={field.name} className="text-sm text-gray-600">
                      <span className="font-medium">{field.name}:</span> {item[field.name]}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => removeContentItem(selectedCollection, item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentList;