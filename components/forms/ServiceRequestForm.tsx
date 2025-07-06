'use client';

import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface ServiceRequestFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface Project {
  _id: string;
  title: string;
}

interface Service {
  _id: string;
  name: string;
  basePrice: number;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onSuccess, onError }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available projects and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, servicesResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services')
        ]);

        const projectsResult = await projectsResponse.json();
        const servicesResult = await servicesResponse.json();

        if (projectsResult.success) {
          setProjects(projectsResult.data);
        }

        if (servicesResult.success) {
          setServices(servicesResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const serviceRequestFormConfig: FormConfig = {
    title: 'Create Service Request',
    description: 'Submit a request for service delivery',
    endpoint: '/api/service-requests',
    method: 'POST',
    submitButtonText: 'Submit Request',
    onSuccess,
    onError,
    fields: [
      {
        name: 'projectId',
        label: 'Project',
        type: 'select',
        required: true,
        options: projects.map(project => ({
          value: project._id,
          label: project.title
        })),
        description: 'Select the project this service request belongs to',
      },
      {
        name: 'serviceId',
        label: 'Service',
        type: 'select',
        required: true,
        options: services.map(service => ({
          value: service._id,
          label: `${service.name} ($${service.basePrice})`
        })),
        description: 'Select the service you want to request',
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: 'Enter quantity',
        required: true,
        defaultValue: 1,
        validation: {
          min: 1,
          max: 100,
        },
        description: 'Number of service units requested',
      },
      {
        name: 'priority',
        label: 'Priority Level',
        type: 'select',
        required: true,
        defaultValue: 'medium',
        options: [
          { value: 'low', label: 'Low Priority' },
          { value: 'medium', label: 'Medium Priority' },
          { value: 'high', label: 'High Priority' },
          { value: 'urgent', label: 'Urgent' },
        ],
        description: 'Priority level for this service request',
      },
      {
        name: 'requestedDate',
        label: 'Requested Start Date',
        type: 'date',
        required: true,
        description: 'When do you need this service to start?',
      },
      {
        name: 'scheduledDate',
        label: 'Preferred Scheduled Date',
        type: 'date',
        required: false,
        description: 'Optional: Preferred date for service delivery',
      },
      {
        name: 'requirements',
        label: 'Requirements',
        type: 'textarea',
        placeholder: 'Enter detailed requirements for this service',
        required: true,
        validation: {
          minLength: 10,
          maxLength: 1000,
        },
        description: 'Detailed requirements and specifications',
      },
      {
        name: 'notes',
        label: 'Additional Notes',
        type: 'textarea',
        placeholder: 'Any additional notes or comments',
        required: false,
        validation: {
          maxLength: 500,
        },
        description: 'Optional additional notes or special instructions',
      },
      {
        name: 'title',
        label: 'title ',
        type: 'text',
        placeholder: 'Any additional notes or comments',
        required: true,
        validation: {
          maxLength: 500,
        },
        description: 'Optional additional notes or special instructions',
      },
    ],
  };

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading projects and services...</p>
        </div>
      </div>
    );
  }

  // Show error if no data available
  if (projects.length === 0 || services.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-red-600">
            {projects.length === 0 && 'No projects available. '}
            {services.length === 0 && 'No services available. '}
            Please create projects and services first.
          </p>
        </div>
      </div>
    );
  }

  return <DynamicForm config={serviceRequestFormConfig} />;
};

export default ServiceRequestForm;
