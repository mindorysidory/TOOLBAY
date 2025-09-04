import React from 'react';
import { Link } from 'react-router-dom';

type TabType = 'ai-tools' | 'productivity' | 'web-services' | 'design-tools' | 'developer';

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onAddToolClick?: () => void;
}

const Header: React.FC<Props> = ({ activeTab, onTabChange, onAddToolClick }) => {

  const tabs = [
    { id: 'ai-tools' as TabType, name: 'AI Tools' },
    { id: 'productivity' as TabType, name: 'Productivity Tools' },
    { id: 'web-services' as TabType, name: 'Web Services' },
    { id: 'design-tools' as TabType, name: 'Design Tools' },
    { id: 'developer' as TabType, name: 'Developer Tools' },
  ];

  return (
    <header className="bg-[#1a1d21] backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50 shadow-sm relative">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md relative overflow-hidden">
              {/* 귀여운 클립 모양 */}
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#e2e8f0] tracking-tight">TOOLBAY</h1>
              <p className="text-xs text-[#94a3b8]">Community-verified tools • Real-time collaborative reviews</p>
            </div>
          </Link>

          {/* Search Bar & Add Tool Button */}
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <div className="w-96">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for AI tools... (ChatGPT, Claude, Midjourney, etc.)"
                  className="w-full h-12 px-6 pl-12 pr-4 text-[#e2e8f0] placeholder-[#94a3b8] bg-[#252832] border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* Add New Tools Button */}
            <button 
              onClick={onAddToolClick}
              className="group relative flex items-center space-x-3 px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-110 hover:-translate-y-1 border border-white/20 backdrop-blur-sm overflow-hidden"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated sparkle effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-2 left-3 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-2 left-1/2 w-0.5 h-0.5 bg-white/60 rounded-full animate-bounce delay-500"></div>
              </div>
              
              {/* Plus icon with enhanced animation */}
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              
              {/* Button text with enhanced styling */}
              <span className="text-sm font-bold tracking-wide relative z-10 group-hover:text-white transition-colors duration-200">
                Add New Tools
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="px-6 border-b border-gray-700/30">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#e2e8f0] border-b-2 border-blue-500'
                  : 'text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;