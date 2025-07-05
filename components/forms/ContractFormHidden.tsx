'use client';

import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface ContractFormHiddenProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  customerId?: string; // Optional prop to pass customer ID
}

const ContractFormHidden: React.FC<ContractFormHiddenProps> = ({ onSuccess, onError, customerId }) => {
  const [currentCustomerId, setCurrentCustomerId] = useState<string>('');

  // Get customer ID from token or props
  useEffect(() => {
    const getCustomerIdFromToken = () => {
      try {
        // Check if customer ID is passed as prop
        if (customerId) {
          setCurrentCustomerId(customerId);
          return;
        }

        // Try to get from localStorage token
        const token = localStorage.getItem('customerToken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.customerId) {
            setCurrentCustomerId(payload.customerId);
            return;
          }
        }

        // Fallback: Generate a sample customer ID for demo
        setCurrentCustomerId('67890abcdef123456789012');
      } catch (error) {
        console.error('Error getting customer ID:', error);
        // Fallback customer ID
        setCurrentCustomerId('67890abcdef123456789012');
      }
    };

    getCustomerIdFromToken();
  }, [customerId]);

  const contractFormConfig: FormConfig = {
    title: 'Create New Contract',
    description: 'Fill out the form below to create a new contract',
    endpoint: '/api/contracts',
    method: 'POST',
    submitButtonText: 'Create Contract',
    onSuccess,
    onError,
    fields: [
      {
        name: 'customerId',
        label: 'Customer ID',
        type: 'hidden', // This field will be hidden from the user
        defaultValue: currentCustomerId,
        required: true,
      },
      {
        name: 'contractNumber',
        label: 'Contract Number',
        type: 'text',
        placeholder: 'Enter unique contract number',
        required: true,
        validation: {
          minLength: 3,
          maxLength: 50,
        },
      },
      {
        name: 'contractType',
        label: 'Contract Type',
        type: 'select',
        required: true,
        defaultValue: 'standard',
        options: [
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' },
          { value: 'enterprise', label: 'Enterprise' },
          { value: 'custom', label: 'Custom' },
        ],
      },
      {
        name: 'status',
        label: 'Contract Status',
        type: 'select',
        required: true,
        defaultValue: 'draft',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
          { value: 'terminated', label: 'Terminated' },
          { value: 'expired', label: 'Expired' },
        ],
      },
      {
        name: 'signedDate',
        label: 'Signed Date',
        type: 'date',
        required: false,
        description: 'Date when the contract was signed',
      },
      {
        name: 'expiryDate',
        label: 'Expiry Date',
        type: 'date',
        required: false,
        description: 'Date when the contract expires',
      },
      {
        name: 'terms',
        label: 'Contract Terms',
        type: 'textarea',
        placeholder: 'Enter contract terms and conditions',
        required: false,
        validation: {
          maxLength: 5000,
        },
        description: 'Detailed terms and conditions of the contract',
      },
    ],
  };

  return <DynamicForm config={contractFormConfig} initialData={{ customerId: currentCustomerId }} />;
};

export default ContractFormHidden;
