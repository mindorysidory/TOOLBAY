import React from 'react';
import SimpleHeader from '../components/layout/simple-header';
import Footer from '../components/layout/footer';

const Terms: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100">
      <SimpleHeader />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-600">TOOLBAY Service Terms and Policies</p>
          </div>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 1 (Purpose)</h2>
              <p className="text-slate-700 leading-relaxed">
                These terms aim to regulate the conditions and procedures for using the AI tool collective intelligence evaluation platform service (hereinafter "Service") provided by TOOLBAY (hereinafter "Company"), and the rights, obligations, and responsibilities between the Company and users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 2 (Definitions)</h2>
              <div className="space-y-2">
                <p className="text-slate-700"><strong>1. "Service"</strong> means the AI tool evaluation and review platform provided by the Company.</p>
                <p className="text-slate-700"><strong>2. "User"</strong> means any individual who uses the Service in accordance with these terms.</p>
                <p className="text-slate-700"><strong>3. "Content"</strong> means reviews, ratings, comments, etc. created by users within the Service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 3 (Effectiveness and Changes of Terms)</h2>
              <p className="text-slate-700 leading-relaxed">
                These terms become effective by posting them on the service screen or notifying users by other means. The Company may change these terms when necessary, and the changed terms become effective by notifying or announcing them in the same manner as in paragraph 1.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 4 (Service Provision)</h2>
              <div className="space-y-2">
                <p className="text-slate-700"><strong>1. AI Tool Information:</strong> Provides information about various AI tools and user reviews.</p>
                <p className="text-slate-700"><strong>2. Evaluation System:</strong> Allows anonymous sharing of evaluations and opinions about AI tools.</p>
                <p className="text-slate-700"><strong>3. Real-time Updates:</strong> Reflects new tool information and user feedback in real-time.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 5 (User Obligations)</h2>
              <div className="space-y-2">
                <p className="text-slate-700">Users must not engage in the following activities:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-700">
                  <li>Creating false information or deceiving others</li>
                  <li>Infringing on others' intellectual property rights</li>
                  <li>Creating inappropriate content such as profanity, slander, or discriminatory expressions</li>
                  <li>Interfering with the stable operation of the service</li>
                  <li>Other activities that violate relevant laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Article 6 (Disclaimer)</h2>
              <p className="text-slate-700 leading-relaxed">
                The Company is exempt from responsibility for service provision when it cannot provide services due to natural disasters or equivalent force majeure. The Company is not responsible for the loss of profits that users expect from using the service.
              </p>
            </section>
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              These terms are effective from August 28, 2024.<br />
              If you have any questions, please contact us at <a href="mailto:legal@toolbay.ai" className="text-blue-600 hover:underline">legal@toolbay.ai</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;