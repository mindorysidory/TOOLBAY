import React, { useState } from 'react';
import { apiService } from '../../services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (success: boolean, message?: string) => void;
}

const AddToolModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category_id: 'ai-tools',
    pricing: 'unknown',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'ai-tools', name: 'AI Tools' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'web-services', name: 'Web Services' },
    { id: 'design-tools', name: 'Design Tools' },
    { id: 'developer', name: 'Developer Tools' }
  ];

  const pricingOptions = [
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'one-time', label: 'One-time Payment' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const normalizeUrl = (inputUrl: string): string => {
    let normalizedUrl = inputUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }
    return normalizedUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.url) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const normalizedUrl = normalizeUrl(formData.url);
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await apiService.createTool({
        name: formData.name,
        description: formData.description,
        url: normalizedUrl,
        category_id: formData.category_id,
        pricing: formData.pricing,
        tags: tagsArray
      });

      // Success
      onSubmit(true, `🎉 ${formData.name} has been successfully added to TOOLBAY!`);
      handleClose();
    } catch (err) {
      console.error('Failed to create tool:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add tool';
      setError(errorMessage);
      onSubmit(false, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      url: '',
      category_id: 'ai-tools',
      pricing: 'unknown',
      tags: ''
    });
    setError('');
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#252832] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">Add New Tool</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-gray-600/50 hover:bg-gray-600 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Tool Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] placeholder:text-[#94a3b8] focus:border-blue-500 focus:outline-none"
              placeholder="e.g., ChatGPT, Figma, Notion"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Website URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] placeholder:text-[#94a3b8] focus:border-blue-500 focus:outline-none"
              placeholder="https://example.com"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] placeholder:text-[#94a3b8] focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Describe what this tool does and how it helps users..."
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Category *
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => handleInputChange('category_id', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] focus:border-blue-500 focus:outline-none"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Pricing Model
            </label>
            <select
              value={formData.pricing}
              onChange={(e) => handleInputChange('pricing', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] focus:border-blue-500 focus:outline-none"
            >
              {pricingOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-[#e2e8f0] mb-2">
              Tags (optional)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1d21] border border-gray-600 rounded-xl text-[#e2e8f0] placeholder:text-[#94a3b8] focus:border-blue-500 focus:outline-none"
              placeholder="AI, Writing, Productivity (comma-separated)"
            />
            <p className="text-xs text-[#94a3b8] mt-1">
              Add relevant tags separated by commas
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-[#94a3b8] hover:text-[#e2e8f0] transition-colors font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Tool...</span>
                </div>
              ) : (
                'Add Tool'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToolModal;