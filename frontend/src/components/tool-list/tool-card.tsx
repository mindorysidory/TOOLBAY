import React from 'react';

interface ToolData {
  id: string;
  name: string;
  description: string;
  url: string;
  favicon?: string;
  category: string;
  pricing: string;
  averageRating: number;
  totalVotes: number;
  totalOpinions: number;
  tags: string[];
  isSponsored: boolean;
  createdAt: string;
}

interface Props {
  tool: ToolData;
  isSelected: boolean;
  onClick: () => void;
}

const ToolCard: React.FC<Props> = ({ tool, isSelected, onClick }) => {
  const getPricingText = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'Free';
      case 'freemium': return 'Premium';
      case 'subscription': return 'Paid';
      default: return 'Other';
    }
  };

  const getPricingStyle = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'text-green-400 bg-green-500/20';
      case 'freemium': return 'text-orange-400 bg-orange-500/20';
      case 'subscription': return 'text-red-400 bg-red-500/20';
      default: return 'text-[#94a3b8] bg-gray-500/20';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#252832] backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-[#2a2f3a] ${
        isSelected 
          ? 'ring-2 ring-blue-500/60 bg-[#2a2f3a]' 
          : ''
      } ${tool.isSponsored ? 'ring-1 ring-yellow-400/60 bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''}`}
    >
      {/* Sponsored Badge */}
      {tool.isSponsored && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm">
          AD
        </div>
      )}

      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {tool.favicon ? (
            <img 
              src={tool.favicon} 
              alt=""
              className="w-12 h-12 rounded-xl shadow-md transition-shadow"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">{tool.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#e2e8f0] group-hover:text-white transition-colors mb-1 truncate">
                {tool.name}
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            
            {/* Rating & Price */}
            <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
              <div className="flex items-center space-x-1 bg-amber-500/20 px-2 py-1 rounded-lg">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-amber-300">{tool.averageRating}</span>
              </div>
              
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${getPricingStyle(tool.pricing)}`}>
                {getPricingText(tool.pricing)}
              </span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-[#94a3b8]">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span>{tool.totalVotes > 999 ? `${Math.floor(tool.totalVotes/1000)}k` : tool.totalVotes} votes</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{tool.totalOpinions} reviews</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-green-300">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;