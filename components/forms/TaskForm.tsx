'use client';

import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types/form';

interface TaskFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface ServiceRequest {
  _id: string;
  requirements: string;
  projectId: {
    title: string;
  };
  serviceId: {
    name: string;
  };
}

interface Team {
  _id: string;
  name: string;
  specialization: string;
}

interface User {
  _id: string;
  name: string;
  role: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSuccess, onError }) => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRequestsResponse, teamsResponse, usersResponse] = await Promise.all([
          fetch('/api/service-requests'),
          fetch('/api/teams'),
          fetch('/api/users')
        ]);

        const serviceRequestsResult = await serviceRequestsResponse.json();
        const teamsResult = await teamsResponse.json();
        const usersResult = await usersResponse.json();

        if (serviceRequestsResult.success) {
          setServiceRequests(serviceRequestsResult.data);
        }

        if (teamsResult.success) {
          setTeams(teamsResult.data);
        }

        if (usersResult.success) {
          setUsers(usersResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const taskFormConfig: FormConfig = {
    title: 'Create New Task',
    description: 'Create a task for service request execution',
    endpoint: '/api/tasks',
    method: 'POST',
    submitButtonText: 'Create Task',
    onSuccess,
    onError,
    fields: [
      {
        name: 'serviceRequestId',
        label: 'Service Request',
        type: 'select',
        required: true,
        options: serviceRequests.map(request => ({
          value: request._id,
          label: `${request.projectId?.title} - ${request.serviceId?.name} (${request.requirements.substring(0, 50)}...)`
        })),
        description: 'Select the service request this task belongs to',
      },
      {
        name: 'title',
        label: 'Task Title',
        type: 'text',
        placeholder: 'Enter task title',
        required: true,
        validation: {
          minLength: 3,
          maxLength: 100,
        },
        description: 'Clear and descriptive title for the task',
      },
      {
        name: 'description',
        label: 'Task Description',
        type: 'textarea',
        placeholder: 'Enter detailed description of the task',
        required: true,
        validation: {
          minLength: 10,
          maxLength: 1000,
        },
        description: 'Detailed description of what needs to be done',
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
        description: 'Priority level for this task',
      },
      {
        name: 'status',
        label: 'Task Status',
        type: 'select',
        required: true,
        defaultValue: 'todo',
        options: [
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'review', label: 'In Review' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
        description: 'Current status of the task',
      },
      {
        name: 'assignedTeamId',
        label: 'Assigned Team (Optional)',
        type: 'select',
        required: false,
        options: teams.map(team => ({
          value: team._id,
          label: `${team.name} (${team.specialization})`
        })),
        description: 'Optional: Assign this task to a specific team',
      },
      {
        name: 'assignedUserId',
        label: 'Assigned User (Optional)',
        type: 'select',
        required: false,
        options: users.map(user => ({
          value: user._id,
          label: `${user.name} (${user.role})`
        })),
        description: 'Optional: Assign this task to a specific user',
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: false,
        description: 'Optional: When should this task start?',
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'date',
        required: false,
        description: 'Optional: When should this task be completed?',
      },
      {
        name: 'deliverables',
        label: 'Expected Deliverables',
        type: 'textarea',
        placeholder: 'Describe the expected deliverables',
        required: false,
        validation: {
          maxLength: 500,
        },
        description: 'Optional: What deliverables are expected from this task?',
      },
      {
        name: 'notes',
        label: 'Task Notes',
        type: 'textarea',
        placeholder: 'Any additional notes or instructions',
        required: false,
        validation: {
          maxLength: 500,
        },
        description: 'Optional: Additional notes or special instructions',
      },
    ],
  };

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading service requests, teams, and users...</p>
        </div>
      </div>
    );
  }

  // Show error if no service requests available
  if (serviceRequests.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-red-600">No service requests available. Please create service requests first.</p>
        </div>
      </div>
    );
  }

  return <DynamicForm config={taskFormConfig} />;
};

export default TaskForm;
