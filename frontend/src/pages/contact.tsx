import React from 'react';
import SimpleHeader from '../components/layout/simple-header';
import Footer from '../components/layout/footer';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100">
      <SimpleHeader />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact</h1>
            <p className="text-slate-600">
              Please contact us if you have any questions about TOOLBAY or business proposals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 연락 정보 */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">General Inquiry</h3>
                      <p className="text-slate-600 text-sm">tjsalg1@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Business Partnership</h3>
                      <p className="text-slate-600 text-sm">tjsalg1@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 추가 정보 */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Service Information</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                    <h3 className="font-medium text-slate-900 mb-2">🚀 Service Status</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 100+ AI tool information and growing</li>
                      <li>• Real-time collective intelligence evaluation</li>
                      <li>• Anonymous community-based participation</li>
                      <li>• Live voting and opinion updates</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                    <h3 className="font-medium text-slate-900 mb-2">💬 Response Time</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• General inquiry: 1-2 business days</li>
                      <li>• Business partnership: 2-3 business days</li>
                      <li>• Technical support: Within 24 hours</li>
                      <li>• Community feedback: Same day review</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <h3 className="font-medium text-slate-900 mb-2">🌟 Partnership Proposals</h3>
                    <p className="text-sm text-slate-600">
                      We welcome collaborations with AI tool developers, review platforms, and tech media. 
                      Let's discuss various partnership opportunities that benefit both parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;