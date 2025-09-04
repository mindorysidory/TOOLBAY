import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader: React.FC = () => {
  return (
    <header className="bg-[#1a1d21] backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md relative overflow-hidden">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#e2e8f0] tracking-tight">TOOLBAY</h1>
              <p className="text-xs text-[#94a3b8]">Community-verified tools • Real-time collaborative reviews</p>
            </div>
          </Link>

          {/* Navigation */}
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
  );
};

export default SimpleHeader;