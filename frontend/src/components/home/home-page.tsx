import React, { useState, useEffect } from 'react';
import Home from './home';
import { apiService, type Tool } from '../../services/api';

const HomePage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 병렬로 데이터 로드
        const [toolsData, categoriesData] = await Promise.all([
          apiService.getTools({ limit: 50 }), // 홈페이지에서 더 많은 도구 로드
          apiService.getCategories()
        ]);
        
        setTools(toolsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1d21] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#94a3b8]">Loading TOOLBAY...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1d21] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">⚠️ Error loading data</div>
          <p className="text-[#94a3b8] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <Home allTools={tools} categories={categories} />;
};

export default HomePage;