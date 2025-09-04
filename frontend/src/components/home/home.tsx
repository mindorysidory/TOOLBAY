import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool } from '../../services/api';

interface Props {
  allTools: Tool[];
  categories?: any[];
}

const Home: React.FC<Props> = ({ allTools }) => {
  // Recent Activity: Tools with activity in the last 3 days
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const recentTools = [...allTools]
    .filter(tool => new Date(tool.created_at) >= threeDaysAgo)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  // Popular Tools: Tools with rating 4.5 or higher
  const popularTools = [...allTools]
    .filter(tool => (tool.average_rating || 0) >= 4.5)
    .sort((a, b) => (b.average_rating * b.total_votes) - (a.average_rating * a.total_votes))
    .slice(0, 10);

  // New Tools: Tools added within the last week
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newTools = [...allTools]
    .filter(tool => new Date(tool.created_at) >= oneWeekAgo)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  // 카테고리별 통계
  const categoryStats = {
    'ai-tools': allTools.filter(tool => tool.category_id === 'ai-tools').length,
    'productivity': allTools.filter(tool => tool.category_id === 'productivity').length,
    'web-services': allTools.filter(tool => tool.category_id === 'web-services').length,
    'design-tools': allTools.filter(tool => tool.category_id === 'design-tools').length,
    'developer': allTools.filter(tool => tool.category_id === 'developer').length,
  };

  const getPricingStyle = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'text-green-400 bg-green-500/20';
      case 'freemium': return 'text-orange-400 bg-orange-500/20';
      case 'subscription': return 'text-red-400 bg-red-500/20';
      default: return 'text-[#94a3b8] bg-gray-500/20';
    }
  };

  const getPricingText = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'Free';
      case 'freemium': return 'Premium';
      case 'subscription': return 'Paid';
      default: return 'Other';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => (
    <Link 
      to="/tools" 
      className="block bg-[#252832] backdrop-blur-sm rounded-xl p-4 hover:bg-[#2a2f3a] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#e2e8f0] mb-1">{tool.name}</h3>
          <p className="text-[#94a3b8] text-sm line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <div className="flex items-center space-x-1 bg-amber-500/20 px-2 py-1 rounded-lg">
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-amber-300">{tool.average_rating?.toFixed(1) || '0.0'}</span>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${getPricingStyle(tool.pricing)}`}>
            {getPricingText(tool.pricing)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-[#94a3b8]">
          <span>{tool.total_votes || 0} votes</span>
          <span>{tool.total_opinions || 0} reviews</span>
        </div>
        <div className="text-xs text-[#94a3b8]">
          {formatDate(tool.created_at)}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#1a1d21] relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative bg-[#252832]/50 backdrop-blur-sm border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#e2e8f0]">TOOLBAY</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link 
                to="/tools" 
                className="px-4 py-2 text-[#94a3b8] hover:text-[#e2e8f0] transition-colors font-medium"
              >
                Browse Tools
              </Link>
              <Link 
                to="/feedback" 
                className="text-[#94a3b8] hover:text-[#e2e8f0] transition-colors"
              >
                Feedback
              </Link>
              <Link 
                to="/contact" 
                className="text-[#94a3b8] hover:text-[#e2e8f0] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-[#252832] backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-[#e2e8f0] mb-4">
              TOOLBAY
            </h1>
            <p className="text-xl text-[#94a3b8] mb-8 max-w-3xl mx-auto">
              You can Add new tools, You can recommend tools, You can criticize tools<br />
              Powered by collective intelligence and voluntary participation evaluation system
            </p>
            
            <div className="flex justify-center mb-8">
              <Link 
                to="/tools"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Explore Tools</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#1a1d21]/50 rounded-xl p-4 border border-gray-700/30">
                <div className="text-2xl font-bold text-blue-400">{categoryStats['ai-tools']}</div>
                <div className="text-sm text-[#94a3b8]">AI Tools</div>
              </div>
              <div className="bg-[#1a1d21]/50 rounded-xl p-4 border border-gray-700/30">
                <div className="text-2xl font-bold text-green-400">{categoryStats.productivity}</div>
                <div className="text-sm text-[#94a3b8]">Productivity</div>
              </div>
              <div className="bg-[#1a1d21]/50 rounded-xl p-4 border border-gray-700/30">
                <div className="text-2xl font-bold text-purple-400">{categoryStats['web-services']}</div>
                <div className="text-sm text-[#94a3b8]">Web Services</div>
              </div>
              <div className="bg-[#1a1d21]/50 rounded-xl p-4 border border-gray-700/30">
                <div className="text-2xl font-bold text-pink-400">{categoryStats['design-tools']}</div>
                <div className="text-sm text-[#94a3b8]">Design Tools</div>
              </div>
              <div className="bg-[#1a1d21]/50 rounded-xl p-4 border border-gray-700/30">
                <div className="text-2xl font-bold text-yellow-400">{categoryStats.developer}</div>
                <div className="text-sm text-[#94a3b8]">Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#e2e8f0] mb-2">Recent Activity</h2>
                <p className="text-[#94a3b8] text-sm">Last 3 days</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs font-semibold">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              {recentTools.length > 0 ? recentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              )) : (
                <div className="bg-[#252832] backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-[#94a3b8] text-sm">No recent activity in the last 3 days</div>
                </div>
              )}
            </div>
          </div>

          {/* Popular Tools Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#e2e8f0] mb-2">Popular Tools</h2>
                <p className="text-[#94a3b8] text-sm">4.5+ rating</p>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-amber-300 text-xs font-semibold">Top Rated</span>
              </div>
            </div>
            <div className="space-y-4">
              {popularTools.length > 0 ? popularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              )) : (
                <div className="bg-[#252832] backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-[#94a3b8] text-sm">No tools with 4.5+ rating yet</div>
                </div>
              )}
            </div>
          </div>

          {/* New Tools Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#e2e8f0] mb-2">New Tools</h2>
                <p className="text-[#94a3b8] text-sm">Last week</p>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-blue-300 text-xs font-semibold">Fresh</span>
              </div>
            </div>
            <div className="space-y-4">
              {newTools.length > 0 ? newTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              )) : (
                <div className="bg-[#252832] backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-[#94a3b8] text-sm">No new tools added this week</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;