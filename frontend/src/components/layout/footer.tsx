import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#252832] border-t border-gray-600/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 좌측 - 로고 및 저작권 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
              <span className="text-[#e2e8f0] text-sm font-medium">© 2025 TOOLBAY</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-xs text-[#94a3b8]">
              <span>•</span>
              <span>Community-verified platform</span>
              <span>•</span>
              <span>Anonymous community</span>
            </div>
          </div>

          {/* 우측 - 링크들 */}
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/terms" className="text-[#94a3b8] hover:text-[#e2e8f0] transition-colors">
              Terms of Service
            </Link>
            <Link to="/feedback" className="text-[#94a3b8] hover:text-[#e2e8f0] transition-colors">
              Feedback
            </Link>
            <Link to="/contact" className="text-[#94a3b8] hover:text-[#e2e8f0] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;