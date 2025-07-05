'use client';

import React, { useState } from 'react';
import CustomerForm from '@/components/forms/CustomerForm';
import ContractForm from '@/components/forms/ContractForm';
import ContractFormHidden from '@/components/forms/ContractFormHidden';

const FormsPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'customer' | 'contract' | 'contract-hidden'>('customer');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSuccess = (data: any) => {
    setMessage({ type: 'success', text: 'Form submitted successfully!' });
    console.log('Success:', data);
  };

  const handleError = (error: string) => {
    setMessage({ type: 'error', text: error });
    console.error('Error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dynamic Forms Demo</h1>
          <p className="text-gray-600 mb-6">
            Test the dynamic form components with different configurations for various endpoints.
          </p>

          {/* Form Selector */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveForm('customer')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeForm === 'customer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Customer Form
            </button>
            <button
              onClick={() => setActiveForm('contract')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeForm === 'contract'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Contract Form (ReadOnly)
            </button>
            <button
              onClick={() => setActiveForm('contract-hidden')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeForm === 'contract-hidden'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Contract Form (Hidden)
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`${
                message.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message.text}
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Form Display */}
        {activeForm === 'customer' && (
          <CustomerForm onSuccess={handleSuccess} onError={handleError} />
        )}
        
        {activeForm === 'contract' && (
          <ContractForm onSuccess={handleSuccess} onError={handleError} />
        )}
        
        {activeForm === 'contract-hidden' && (
          <ContractFormHidden onSuccess={handleSuccess} onError={handleError} />
        )}
      </div>
    </div>
  );
};

export default FormsPage;
