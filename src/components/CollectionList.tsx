import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Trash2 } from 'lucide-react';

const CollectionList: React.FC = () => {
  const { collections, removeCollection } = useCMS();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Collections</h2>
      {collections.length === 0 ? (
        <p className="text-gray-600">No collections created yet.</p>
      ) : (
        <ul className="space-y-4">
          {collections.map((collection) => (
            <li key={collection.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">{collection.name}</h3>
                <button
                  onClick={() => removeCollection(collection.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {collection.fields.map((field, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {field.name} ({field.type}){field.required ? ' *' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectionList;