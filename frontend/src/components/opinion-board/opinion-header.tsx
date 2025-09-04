import React, { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  description: string;
  totalOpinions: number;
}

interface Props {
  selectedTool: Tool;
}

const OpinionHeader: React.FC<Props> = ({ selectedTool }) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  // Mock vote data - should come from store
  const voteData = {
    upvotes: 0,
    downvotes: 0,
  };

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Cancel if same button clicked
      setUserVote(null);
    } else {
      setUserVote(voteType);
    }
    // TODO: API call to update vote
  };

  const totalVotes = voteData.upvotes + voteData.downvotes;
  const upvotePercentage = totalVotes > 0 ? Math.round((voteData.upvotes / totalVotes) * 100) : 0;

  return (
    <div className="p-4 border-b border-gray-600/30">
      {/* Simple Tool Info */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#e2e8f0] mb-1">{selectedTool.name}</h2>
        <p className="text-[#94a3b8] text-sm mb-3">{selectedTool.description}</p>
      </div>

      {/* Clean Vote Section */}
      <div className="space-y-4">
        {/* Simple Vote Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              userVote === 'up' 
                ? 'border-green-500 bg-green-500/20 text-green-300' 
                : 'border-gray-500/50 hover:border-green-400 hover:bg-green-500/10 text-gray-400'
            }`}
          >
            <svg 
              className="w-4 h-4" 
              fill={userVote === 'up' ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="font-medium">Like</span>
            <span className="bg-[#1a1d21] px-2 py-0.5 rounded-full text-sm font-semibold text-[#e2e8f0]">
              {voteData.upvotes.toLocaleString()}
            </span>
          </button>

          <button
            onClick={() => handleVote('down')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              userVote === 'down' 
                ? 'border-red-500 bg-red-500/20 text-red-300' 
                : 'border-gray-500/50 hover:border-red-400 hover:bg-red-500/10 text-gray-400'
            }`}
          >
            <svg 
              className="w-4 h-4" 
              fill={userVote === 'down' ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
            <span className="font-medium">Dislike</span>
            <span className="bg-[#1a1d21] px-2 py-0.5 rounded-full text-sm font-semibold text-[#e2e8f0]">
              {voteData.downvotes.toLocaleString()}
            </span>
          </button>
        </div>

        {/* Simple Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[#e2e8f0]">{upvotePercentage}% recommend</span>
            <span className="text-[#94a3b8]">{selectedTool.totalOpinions} reviews</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${upvotePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionHeader;