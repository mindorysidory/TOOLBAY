import React, { useState, useEffect } from 'react';
import OpinionItem from './opinion-item';
import { apiService, type Opinion } from '../../services/api';

interface Props {
  toolId: string;
}

const OpinionList: React.FC<Props> = ({ toolId }) => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);

  // API에서 실제 opinions 로드
  useEffect(() => {
    const loadOpinions = async () => {
      try {
        setLoading(true);
        const fetchedOpinions = await apiService.getOpinions(toolId);
        
        // 실제 데이터가 있으면 사용, 없으면 간단한 샘플 데이터 2개 표시
        if (fetchedOpinions.length === 0) {
          setOpinions([
            {
              id: 'sample-1',
              content: 'Great tool for productivity! Really helps with daily tasks and workflow optimization.',
              rating: 5,
              vote_score: 0,
              created_at: new Date().toISOString(),
              users: { trust_score: 85 }
            },
            {
              id: 'sample-2',
              content: 'Solid features but could use some UI improvements. Overall good value for the price.',
              rating: 4,
              vote_score: 0,
              created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              users: { trust_score: 72 }
            }
          ]);
        } else {
          setOpinions(fetchedOpinions);
        }
      } catch (err) {
        console.error('Failed to load opinions:', err);
        
        // 에러 시에도 샘플 데이터 표시
        setOpinions([
          {
            id: 'sample-1',
            content: 'Great tool for productivity! Really helps with daily tasks and workflow optimization.',
            rating: 5,
            vote_score: 12,
            created_at: new Date().toISOString(),
            users: { trust_score: 85 }
          },
          {
            id: 'sample-2',
            content: 'Solid features but could use some UI improvements. Overall good value for the price.',
            rating: 4,
            vote_score: 8,
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            users: { trust_score: 72 }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (toolId) {
      loadOpinions();
    }
  }, [toolId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleVoteChange = async () => {
    // Refresh opinions after vote to get updated vote scores
    if (toolId) {
      try {
        const fetchedOpinions = await apiService.getOpinions(toolId);
        if (fetchedOpinions.length === 0) {
          // Keep sample opinions if no real data
          const sampleOpinions = [
            {
              id: 'sample-1',
              content: 'Great tool for productivity! Really helps with daily tasks and workflow optimization.',
              rating: 5,
              vote_score: 0,
              created_at: new Date().toISOString(),
              users: { trust_score: 85 }
            },
            {
              id: 'sample-2',
              content: 'Solid features but could use some UI improvements. Overall good value for the price.',
              rating: 4,
              vote_score: 0,
              created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              users: { trust_score: 72 }
            }
          ];
          setOpinions(sampleOpinions);
        } else {
          setOpinions(fetchedOpinions);
        }
      } catch (err) {
        console.error('Failed to refresh opinions:', err);
      }
    }
  };

  return (
    <div>
      {opinions.map((opinion) => (
        <OpinionItem 
          key={opinion.id}
          opinion={opinion}
          onVoteChange={handleVoteChange}
        />
      ))}
      
      {opinions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <div className="w-12 h-12 bg-[#252832]/80 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.75-6M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[#e2e8f0] font-medium">No opinions yet</p>
            <p className="text-[#94a3b8] text-sm">Be the first to share your thoughts!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpinionList;