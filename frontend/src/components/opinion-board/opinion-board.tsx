import React from 'react';
import OpinionHeader from './opinion-header';
import OpinionList from './opinion-list';
import OpinionInput from './opinion-input';

import type { Tool } from '../../services/api';

interface Props {
  selectedTool: Tool | null;
}

const OpinionBoard: React.FC<Props> = ({ selectedTool }) => {
  if (!selectedTool) {
    return (
      <div className="bg-[#252832] backdrop-blur-sm border border-gray-600/30 rounded-xl p-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-20 h-20">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
              <svg 
                className="w-10 h-10 text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.75-6M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500/20 border border-green-400/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#e2e8f0]">Select a Tool</h3>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              Choose an AI tool from the list to see<br />
              community reviews and ratings
            </p>
          </div>

          <div className="inline-flex items-center px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-300 text-xs font-semibold">Live Updates</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#252832] backdrop-blur-sm border border-gray-600/30 rounded-xl overflow-hidden">
      {/* Header with Tool Info & Vote Stats */}
      <OpinionHeader selectedTool={selectedTool as any} />

      {/* Opinion List */}
      <div className="flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
        <OpinionList toolId={selectedTool.id} />
      </div>

      {/* Opinion Input */}
      <div className="border-t border-gray-600/30">
        <OpinionInput toolId={selectedTool.id} />
      </div>
    </div>
  );
};

export default OpinionBoard;