import React, { useState } from 'react';
import SimpleHeader from '../components/layout/simple-header';
import Footer from '../components/layout/footer';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Feedback submitted successfully. Thank you!');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100">
      <SimpleHeader />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Feedback</h1>
            <p className="text-slate-600">
              Help us make TOOLBAY a better service by sharing your valuable feedback with us.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email if you'd like a response"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <p className="mt-1 text-xs text-slate-500">
                You can also send feedback anonymously.
              </p>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Please write a brief feedback title"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                Detailed Content
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide detailed feedback content. For bug reports, including reproduction steps would be helpful."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                All feedback is carefully reviewed 🙏
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </div>
          </form>

          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-medium text-slate-900 mb-2">Q. I want to add a new AI tool</h3>
                <p className="text-sm text-slate-600">
                  Please send feedback with "Feature Request" type and we'll review and add it. Include the tool's name, URL, and brief description.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-medium text-slate-900 mb-2">Q. There's incorrect information</h3>
                <p className="text-sm text-slate-600">
                  Please report with "Bug Report" type including specific details. We'll fix it quickly.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-medium text-slate-900 mb-2">Q. When can I expect a response?</h3>
                <p className="text-sm text-slate-600">
                  If you leave your email, we'll respond within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Feedback;