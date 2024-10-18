import React from 'react';
import { CMSProvider } from './context/CMSContext';
import CollectionForm from './components/CollectionForm';
import CollectionList from './components/CollectionList';
import ContentForm from './components/ContentForm';
import ContentList from './components/ContentList';
import { Database } from 'lucide-react';

function App() {
  return (
    <CMSProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Database className="mr-2" /> Headless CMS
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Collection</h2>
                  <CollectionForm />
                  <CollectionList />
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Content</h2>
                  <ContentForm />
                  <ContentList />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CMSProvider>
  );
}

export default App;