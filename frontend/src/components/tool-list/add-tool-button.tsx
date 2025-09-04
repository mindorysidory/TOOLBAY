import React, { useState } from 'react';
import AddToolModal from './add-tool-modal';

interface Props {
  onToolAdded?: (tool: any) => void;
}

const AddToolButton: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTool = () => {
    setIsModalOpen(true);
  };

  const handleToolSubmit = (toolData: any) => {
    console.log('New tool submitted:', toolData);
    // TODO: API call to add tool
    // In production: dispatch Redux action or make API call
  };

  return (
    <>
      <button
        onClick={handleAddTool}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group transform hover:scale-[1.02]"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 group-hover:from-primary-200 group-hover:to-secondary-200 rounded-xl flex items-center justify-center transition-all">
            <svg 
              className="w-5 h-5 text-primary-600 group-hover:text-primary-700 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
              Add New AI Tool
            </p>
            <p className="text-xs text-gray-500">
              Simply enter URL • Automatic duplicate check
            </p>
          </div>
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <AddToolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleToolSubmit}
      />
    </>
  );
};

export default AddToolButton;