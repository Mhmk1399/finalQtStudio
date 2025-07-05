'use client';

import React from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface ServiceFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSuccess, onError }) => {
  const serviceFormConfig: FormConfig = {
    title: 'Create New Service',
    description: 'Fill out the form below to create a new service offering',
    endpoint: '/api/services',
    method: 'POST',
    submitButtonText: 'Create Service',
    onSuccess,
    onError,
    fields: [
      {
        name: 'name',
        label: 'Service Name',
        type: 'text',
        placeholder: 'Enter service name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        description: 'Clear and descriptive name for the service',
      },
      {
        name: 'description',
        label: 'Service Description',
        type: 'textarea',
        placeholder: 'Enter detailed description of the service',
        required: true,
        validation: {
          minLength: 20,
          maxLength: 1000,
        },
        description: 'Comprehensive description of what this service includes',
      },
      {
        name: 'category',
        label: 'Service Category',
        type: 'select',
        required: true,
        options: [
          { value: 'web-development', label: 'Web Development' },
          { value: 'mobile-development', label: 'Mobile Development' },
          { value: 'ui-ux-design', label: 'UI/UX Design' },
          { value: 'backend-development', label: 'Backend Development' },
          { value: 'devops', label: 'DevOps & Infrastructure' },
          { value: 'data-analytics', label: 'Data Analytics' },
          { value: 'security', label: 'Security & Compliance' },
          { value: 'consulting', label: 'Technical Consulting' },
          { value: 'maintenance', label: 'Maintenance & Support' },
          { value: 'testing', label: 'Quality Assurance & Testing' },
          { value: 'integration', label: 'System Integration' },
          { value: 'training', label: 'Training & Documentation' },
        ],
        description: 'Primary category this service belongs to',
      },
      {
        name: 'basePrice',
        label: 'Base Price (USD)',
        type: 'number',
        placeholder: 'Enter base price',
        required: true,
        validation: {
          min: 0,
          max: 1000000,
        },
        description: 'Starting price for this service in USD',
      },
      {
        name: 'duration',
        label: 'Estimated Duration',
        type: 'select',
        required: true,
        options: [
          { value: '1-3 days', label: '1-3 Days' },
          { value: '1 week', label: '1 Week' },
          { value: '2 weeks', label: '2 Weeks' },
          { value: '1 month', label: '1 Month' },
          { value: '2-3 months', label: '2-3 Months' },
          { value: '3-6 months', label: '3-6 Months' },
          { value: '6+ months', label: '6+ Months' },
          { value: 'ongoing', label: 'Ongoing' },
          { value: 'custom', label: 'Custom Timeline' },
        ],
        description: 'Typical duration needed to complete this service',
      },
      {
        name: 'requirements',
        label: 'Service Requirements',
        type: 'textarea',
        placeholder: 'Enter specific requirements and prerequisites',
        required: true,
        validation: {
          minLength: 10,
          maxLength: 500,
        },
        description: 'Prerequisites, technical requirements, or client responsibilities',
      },
      {
        name: 'teamType',
        label: 'Required Team Type',
        type: 'select',
        required: true,
        options: [
          { value: 'frontend', label: 'Frontend Team' },
          { value: 'backend', label: 'Backend Team' },
          { value: 'fullstack', label: 'Full Stack Team' },
          { value: 'mobile', label: 'Mobile Development Team' },
          { value: 'design', label: 'Design Team' },
          { value: 'devops', label: 'DevOps Team' },
          { value: 'qa', label: 'QA Team' },
          { value: 'data', label: 'Data Science Team' },
          { value: 'security', label: 'Security Team' },
          { value: 'mixed', label: 'Mixed/Multiple Teams' },
          { value: 'any', label: 'Any Available Team' },
        ],
        description: 'Type of team best suited to deliver this service',
      },
      {
        name: 'isActive',
        label: 'Active Service',
        type: 'checkbox',
        defaultValue: true,
        description: 'Check to make this service available for booking',
      },
    ],
  };

  return <DynamicForm config={serviceFormConfig} />;
};

export default ServiceForm;
