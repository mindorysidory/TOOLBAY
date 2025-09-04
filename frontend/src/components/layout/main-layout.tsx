import React, { useState, useEffect } from 'react';
import Header from './header';
import ToolList from '../tool-list/tool-list';
import OpinionBoard from '../opinion-board/opinion-board';
import Footer from './footer';
import AddToolModal from '../tool-list/add-tool-modal';
import { apiService, type Tool } from '../../services/api';

type TabType = 'ai-tools' | 'productivity' | 'web-services' | 'design-tools' | 'developer';

const MainLayout: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [isHeroCollapsed, setIsHeroCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('ai-tools');
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  
  // API 데이터 상태
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 도구 데이터 로드
  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const tools = await apiService.getTools();
        setAllTools(tools);
      } catch (err) {
        console.error('Failed to load tools:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tools');
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  const getToolsByCategory = (category: TabType) => {
    return allTools.filter(tool => tool.category_id === category);
  };

  const toolsForActiveTab = getToolsByCategory(activeTab);

  const selectedTool = selectedToolId ? toolsForActiveTab.find(tool => tool.id === selectedToolId) || null : null;

  const getTabContent = (tab: TabType) => {
    const toolCount = getToolsByCategory(tab).length;
    const tabConfig = {
      'ai-tools': {
        title: 'AI Tools',
        description: `${toolCount} AI tools verified by collective intelligence • Real-time updates`,
        sectionTitle: 'AI Tools'
      },
      'productivity': {
        title: 'Productivity Tools',
        description: `${toolCount} productivity tools to enhance work efficiency • Community verified`,
        sectionTitle: 'Productivity Tools'
      },
      'web-services': {
        title: 'Web Services',
        description: `${toolCount} useful online web services • User evaluated`,
        sectionTitle: 'Web Services'
      },
      'design-tools': {
        title: 'Design Tools',
        description: `${toolCount} tools for creation and design • Real-time reviews`,
        sectionTitle: 'Design Tools'
      },
      'developer': {
        title: 'Developer Tools',
        description: `${toolCount} tools to boost development productivity • Developer community verified`,
        sectionTitle: 'Developer Tools'
      }
    };
    return tabConfig[tab];
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 스크롤이 200px 이상일 때 Hero 섹션 접기
      setIsHeroCollapsed(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 새 도구 추가 성공 후 목록 새로고침
  const handleToolAdded = async (success: boolean) => {
    if (success) {
      // 도구 목록 새로고침
      try {
        const tools = await apiService.getTools();
        setAllTools(tools);
      } catch (err) {
        console.error('Failed to reload tools after adding:', err);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1d21] relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
      {/* Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddToolClick={() => setShowAddToolModal(true)}
      />
      
      {/* Hero Section */}
      <div className={`relative bg-[#252832] backdrop-blur-sm border-b border-gray-700/50 transition-all duration-500 ease-out overflow-hidden ${
        isHeroCollapsed ? 'max-h-16 opacity-60' : 'max-h-32'
      }`}>
        <div className="max-w-7xl mx-auto px-6 transition-all duration-500 ease-out" style={{
          paddingTop: isHeroCollapsed ? '12px' : '32px',
          paddingBottom: isHeroCollapsed ? '12px' : '32px'
        }}>
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-500 ease-out ${
              isHeroCollapsed ? 'transform scale-75 origin-left' : ''
            }`}>
              <h1 className={`font-bold text-[#e2e8f0] transition-all duration-500 ${
                isHeroCollapsed ? 'text-lg mb-0' : 'text-2xl mb-1'
              }`}>
                {getTabContent(activeTab).title}
              </h1>
              <p className={`text-[#94a3b8] text-sm transition-all duration-500 ${
                isHeroCollapsed ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-6'
              }`}>
                {getTabContent(activeTab).description}
              </p>
            </div>
            <div className={`flex items-center space-x-4 transition-all duration-500 ${
              isHeroCollapsed ? 'transform scale-75 origin-right space-x-3' : ''
            }`}>
              <div className="px-4 py-2 bg-green-500/20 rounded-xl backdrop-blur-sm border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-bold">Live</span>
                </div>
              </div>
              {!isHeroCollapsed && (
                <div className="px-4 py-2 bg-blue-500/20 rounded-xl backdrop-blur-sm border border-blue-400/30">
                  <span className="text-blue-300 text-sm font-bold">Anonymous</span>
                </div>
              )}
              {!isHeroCollapsed && (
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/25 to-pink-500/25 border-2 border-purple-400/40 rounded-xl backdrop-blur-sm animate-pulse shadow-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-purple-300 text-sm font-bold">You can add tools!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content - Ratio change: Tools 50% : Opinions 50% */}
      <div className="flex flex-1 overflow-hidden w-full px-6 py-6 gap-6 relative z-10">
        {/* Left Panel - Tool List */}
        <div className="w-[50%] flex flex-col">
          {/* Compact Tools List */}
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[#94a3b8]">Loading tools...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-red-400 mb-2">⚠️ Error loading tools</div>
                  <p className="text-[#94a3b8] mb-4">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : toolsForActiveTab.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-[#94a3b8] mb-4">No tools found in this category</div>
                  <button 
                    onClick={() => setShowAddToolModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg text-white transition-colors"
                  >
                    Add First Tool
                  </button>
                </div>
              </div>
            ) : (
              <ToolList 
                tools={toolsForActiveTab}
                selectedToolId={selectedToolId}
                onToolSelect={setSelectedToolId}
              />
            )}
          </div>
        </div>

        {/* Right Panel - Opinion Board */}
        <div className="w-[50%]">
          <OpinionBoard selectedTool={selectedTool} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Add Tool Modal */}
      <AddToolModal 
        isOpen={showAddToolModal}
        onClose={() => setShowAddToolModal(false)}
        onSubmit={handleToolAdded}
      />
    </div>
  );
};

export default MainLayout;