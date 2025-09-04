import React, { useState } from 'react';

interface Props {
  toolId: string;
}

const OpinionInput: React.FC<Props> = ({ toolId }) => {
  const [opinion, setOpinion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nickname, setNickname] = useState('');

  const maxLength = 300;
  const remainingChars = maxLength - opinion.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!opinion.trim() || !nickname.trim()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: API call to submit opinion
      console.log('Submitting opinion:', { toolId, opinion, nickname });
      
      // Reset form after successful submission
      setOpinion('');
      setNickname('');
      
      // TODO: Show success message
    } catch (error) {
      console.error('Failed to submit opinion:', error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="p-6 bg-gradient-to-br from-[#252832] to-[#1e2329] border-t border-gray-600/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          <h3 className="text-lg font-bold text-[#e2e8f0]">Write New Opinion</h3>
          <span className="text-sm text-[#94a3b8]">Participate anonymously</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nickname Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2e8f0]">Nickname (Anonymous)</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter a temporary nickname (e.g., Developer123, AI_Enthusiast, etc.)"
              className="w-full px-4 py-3 text-[#e2e8f0] bg-[#1a1d21]/70 border border-gray-500/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md placeholder-[#94a3b8]"
              maxLength={20}
              disabled={isSubmitting}
            />
          </div>

          {/* Opinion Input Area */}
          <div className="relative space-y-2">
            <label className="text-sm font-medium text-[#e2e8f0]">Opinion Content</label>
            <textarea
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              placeholder="Share your honest opinion about this AI tool...\n\nExamples:\n• Share your actual usage experience\n• Write specific pros and cons\n• Comparisons with other tools are also welcome"
              className="w-full px-4 py-4 pb-12 text-[#e2e8f0] bg-[#1a1d21]/70 border border-gray-500/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md placeholder-[#94a3b8]"
              rows={4}
              maxLength={maxLength}
              disabled={isSubmitting}
            />
            
            {/* Character Count */}
            <div className="absolute bottom-4 right-4">
              <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
                remainingChars < 20 
                  ? 'text-red-300 bg-red-500/20' 
                  : remainingChars < 50 
                    ? 'text-yellow-300 bg-yellow-500/20' 
                    : 'text-[#e2e8f0] bg-[#1a1d21]'
              }`}>
                {remainingChars}/{maxLength}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center space-x-2 text-sm text-[#94a3b8]">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Please leave constructive and helpful opinions</span>
            </div>
            
            <button
              type="submit"
              disabled={!opinion.trim() || !nickname.trim() || isSubmitting}
              className={`
                px-8 py-3 text-sm font-bold rounded-xl transition-all duration-200 transform
                ${opinion.trim() && nickname.trim() && !isSubmitting
                  ? 'text-[#e2e8f0] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl hover:scale-105'
                  : 'text-[#94a3b8] bg-gray-600/50 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit Opinion</span>
                </div>
              )}
            </button>
          </div>

          {/* Guidelines */}
          {opinion.length > 100 && (
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-sm text-blue-200">
                  <p className="font-bold mb-2">🌟 Tips for Writing Good Opinions</p>
                  <ul className="space-y-1 list-disc list-inside text-blue-300">
                    <li>Share your actual usage experience in detail</li>
                    <li>Describe pros and cons in a balanced way</li>
                    <li>Include information that would help other users</li>
                    <li>Mention the purpose and context of your usage</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OpinionInput;