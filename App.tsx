import React from 'react';
import TextGenerator from './components/TextGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-8">
        
        {/* Main Content Area */}
        <main className="w-full flex flex-col items-center">
          <TextGenerator />
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-4">
          <p>
            Powered by <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Gemini API</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
