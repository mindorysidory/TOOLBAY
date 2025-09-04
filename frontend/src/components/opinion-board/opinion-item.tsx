import React, { useState } from 'react';
import { apiService, type Opinion } from '../../services/api';

interface Props {
  opinion: Opinion;
  onVoteChange?: () => void;
}

const OpinionItem: React.FC<Props> = ({ opinion, onVoteChange }) => {
  const [voteScore] = useState(opinion.vote_score || 0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await apiService.voteOpinion(opinion.id, voteType);
      
      // Update vote state based on backend response
      if (userVote === voteType) {
        // Same vote clicked - remove vote
        setUserVote(null);
      } else {
        // New vote or vote change
        setUserVote(voteType);
      }
      
      // Trigger parent refresh to get updated vote counts from backend
      if (onVoteChange) {
        onVoteChange();
      }
      
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getTrustColor = (trustScore: number) => {
    if (trustScore >= 80) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (trustScore >= 60) return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    if (trustScore >= 40) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getVoteColor = (score: number) => {
    if (score > 0) return 'text-green-400';
    if (score < 0) return 'text-red-400';
    return 'text-[#94a3b8]';
  };

  return (
    <div className="bg-[#252832] backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 mb-4 transition-all duration-200 hover:border-gray-500/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-[#e2e8f0] font-medium text-sm">Anonymous User</span>
            <div className={`px-2 py-1 rounded-lg border text-xs font-medium ${getTrustColor(opinion.users?.trust_score || 50)}`}>
              Trust: {opinion.users?.trust_score || 50}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-[#94a3b8] text-xs">{formatDate(opinion.created_at)}</span>
          {opinion.rating && (
            <div className="flex items-center space-x-1 bg-amber-500/20 px-2 py-1 rounded-lg">
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-amber-300 text-xs font-bold">{opinion.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-[#e2e8f0] leading-relaxed text-sm">
          {opinion.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Upvote */}
          <button
            onClick={() => handleVote('up')}
            disabled={isLoading}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              userVote === 'up' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-500/10 text-[#94a3b8] hover:bg-gray-500/20 border border-gray-600/30'
            } disabled:opacity-50`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-xs font-medium">
              {voteScore > 0 ? '+' : ''}{voteScore}
            </span>
          </button>

          {/* Downvote */}
          <button
            onClick={() => handleVote('down')}
            disabled={isLoading}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              userVote === 'down' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-gray-500/10 text-[#94a3b8] hover:bg-gray-500/20 border border-gray-600/30'
            } disabled:opacity-50`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-[#94a3b8]">
          <span className={getVoteColor(voteScore)}>
            {voteScore > 0 ? `+${voteScore} votes` : voteScore < 0 ? `${voteScore} votes` : 'No votes yet'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OpinionItem;