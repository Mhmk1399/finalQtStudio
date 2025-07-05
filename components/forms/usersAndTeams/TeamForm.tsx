"use client";

import React from "react";
import DynamicForm from "../DynamicForm";
import { FormConfig } from "@/types/form";

interface TeamFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSuccess, onError }) => {
  const teamFormConfig: FormConfig = {
    title: "Create New Team",
    description: "Fill out the form below to create a new team",
    endpoint: "/api/teams",
    method: "POST",
    submitButtonText: "Create Team",
    onSuccess,
    onError,
    fields: [
      {
        name: "name",
        label: "Team Name",
        type: "text",
        placeholder: "Enter team name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        description: "Unique name for the team",
      },
      {
        name: "specialization",
        label: "Specialization",
        type: "select",
        required: true,
        options: [
          { value: "frontend", label: "Frontend Development" },
          { value: "backend", label: "Backend Development" },
          { value: "fullstack", label: "Full Stack Development" },
          { value: "mobile", label: "Mobile Development" },
          { value: "devops", label: "DevOps & Infrastructure" },
          { value: "design", label: "UI/UX Design" },
          { value: "qa", label: "Quality Assurance" },
          { value: "data", label: "Data Science & Analytics" },
          { value: "security", label: "Security & Compliance" },
          { value: "support", label: "Customer Support" },
          { value: "marketing", label: "Marketing & Sales" },
          { value: "management", label: "Project Management" },
        ],
        description: "Primary area of expertise for this team",
      },
      {
        name: "description",
        label: "Team Description",
        type: "textarea",
        placeholder:
          "Enter a detailed description of the team responsibilities and goals",
        required: true,
        validation: {
          minLength: 10,
          maxLength: 500,
        },
        description:
          "Describe the team's role, responsibilities, and objectives",
      },
    ],
  };

  return <DynamicForm config={teamFormConfig} />;
};

export default TeamForm;
