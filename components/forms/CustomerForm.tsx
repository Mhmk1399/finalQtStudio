'use client';

import React from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface CustomerFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSuccess, onError }) => {
  const customerFormConfig: FormConfig = {
    title: 'فرم ثبت نام',
    description: 'Fill out the form below to create a new customer account',
    endpoint: '/api/customers',
    method: 'POST',
    submitButtonText: 'Create Customer',
    onSuccess,
    onError,
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter customer full name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        validation: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        },
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: true,
        validation: {
          pattern: '^[+]?[0-9]{10,15}$',
        },
        description: 'Enter phone number with country code (e.g., +1234567890)',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: false,
        validation: {
          minLength: 8,
        },
        description: 'Leave empty if customer will set password later',
      },
      {
        name: 'businessName',
        label: 'Business Name',
        type: 'text',
        placeholder: 'Enter business name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 200,
        },
      },
      {
        name: 'businessScale',
        label: 'Business Scale',
        type: 'select',
        required: true,
        options: [
          { value: 'startup', label: 'Startup' },
          { value: 'small', label: 'Small Business' },
          { value: 'medium', label: 'Medium Business' },
          { value: 'large', label: 'Large Business' },
          { value: 'enterprise', label: 'Enterprise' },
        ],
      },
      {
        name: 'address',
        label: 'Business Address',
        type: 'textarea',
        placeholder: 'Enter complete business address',
        required: true,
        validation: {
          minLength: 10,
          maxLength: 500,
        },
      },
      {
        name: 'website',
        label: 'Website URL',
        type: 'text',
        placeholder: 'https://example.com',
        required: false,
        validation: {
          pattern: '^https?://.*',
        },
        description: 'Optional: Enter website URL starting with http:// or https://',
      }
    ],
  };

  return <DynamicForm config={customerFormConfig} />;
};

export default CustomerForm;
