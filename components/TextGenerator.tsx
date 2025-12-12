import React, { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import { LoadingStatus } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { Send, Trash2, Copy, Check } from 'lucide-react';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setStatus(LoadingStatus.LOADING);
    setErrorMessage(null);
    setResult(null);

    try {
      const text = await generateContent(prompt);
      setResult(text);
      setStatus(LoadingStatus.SUCCESS);
    } catch (error) {
      setStatus(LoadingStatus.ERROR);
      setErrorMessage("Failed to generate content. Please try again.");
    }
  }, [prompt]);

  const handleClear = useCallback(() => {
    setPrompt('');
    setResult(null);
    setStatus(LoadingStatus.IDLE);
    setErrorMessage(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">✨</span> Gemini AI Generator
        </h2>
        <p className="text-blue-100 mt-2 text-sm opacity-90">
          Powered by Gemini 2.5 Flash
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Section */}
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700">
            What would you like to create?
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a short poem about the ocean..."
              className="w-full h-32 p-4 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50 focus:bg-white transition-all duration-200"
              disabled={status === LoadingStatus.LOADING}
            />
            {prompt && (
              <button
                onClick={() => setPrompt('')}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Clear text"
                disabled={status === LoadingStatus.LOADING}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleClear}
              disabled={!prompt && !result}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || status === LoadingStatus.LOADING}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg
                ${!prompt.trim() || status === LoadingStatus.LOADING 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
            >
              {status === LoadingStatus.LOADING ? (
                <>
                  <LoadingSpinner />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Generate</span>
                </>
              )}
            </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Output Section */}
        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                AI Response
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
              <div className="prose prose-indigo max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextGenerator;
