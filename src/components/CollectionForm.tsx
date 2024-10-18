import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Field } from '../types/cms';
import { PlusCircle, Trash2 } from 'lucide-react';

const CollectionForm: React.FC = () => {
  const { addCollection } = useCMS();
  const [name, setName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'text', required: false }]);
  };

  const handleFieldChange = (index: number, field: Partial<Field>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCollection({ name, fields });
    setName('');
    setFields([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Collection Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700">Fields</h3>
        {fields.map((field, index) => (
          <div key={index} className="mt-2 flex items-center space-x-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(index, { name: e.target.value })}
              placeholder="Field name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, { type: e.target.value as Field['type'] })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
            </select>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => handleFieldChange(index, { required: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Required</span>
            </label>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle size={16} className="mr-2" />
          Add Field
        </button>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Collection
      </button>
    </form>
  );
};

export default CollectionForm;