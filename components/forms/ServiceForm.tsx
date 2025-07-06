"use client";

import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { FormConfig } from "@/types/form";

interface ServiceFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface Team {
  _id: string;
  name: string;
  specialization: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSuccess, onError }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        const result = await response.json();

        if (result.success) {
          setTeams(result.data);
        } else {
          console.error("Failed to fetch teams:", result.error);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);
  const serviceFormConfig: FormConfig = {
    title: "Create New Service",
    description: "Fill out the form below to create a new service offering",
    endpoint: "/api/services",
    method: "POST",
    submitButtonText: "Create Service",
    onSuccess,
    onError,
    fields: [
      {
        name: "name",
        label: "Service Name",
        type: "text",
        placeholder: "Enter service name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        description: "Clear and descriptive name for the service",
      },
      {
        name: "description",
        label: "Service Description",
        type: "textarea",
        placeholder: "Enter detailed description of the service",
        required: false,
        validation: {
          maxLength: 1000,
        },
        description: "Optional description of what this service includes",
      },

      {
        name: "basePrice",
        label: "Base Price (USD)",
        type: "number",
        placeholder: "Enter base price",
        required: true,
        validation: {
          min: 0,
          max: 1000000,
        },
        description: "Starting price for this service in USD",
      },

      {
        name: "teamId",
        label: "Assigned Team",
        type: "select",
        required: true,
        options: teams.map((team) => ({
          value: team._id,
          label: `${team.name} (${team.specialization})`,
        })),
        description: "Select the team responsible for delivering this service",
      },
    ],
  };

  // Show loading while fetching teams
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading teams...</p>
        </div>
      </div>
    );
  }

  // Show error if no teams available
  if (teams.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-red-600">
            No teams available. Please create teams first.
          </p>
        </div>
      </div>
    );
  }

  return <DynamicForm config={serviceFormConfig} />;
};

export default ServiceForm;
