"use client";

import React from "react";
import DynamicTable from "@/components/tables/DynamicTable";
import { TableConfig } from "@/types/tables";
import { useParams } from "next/navigation";

const UserTasksPage = () => {
  const { id } = useParams<{ id: string }>();

  const tableConfig: TableConfig = {
    title: `Tasks for User ${id}`,
    description: "A list of tasks assigned to the user.",
    endpoint: `/api/tasks/${id}`,
    columns: [
      { key: "title", label: "Title", sortable: true },
      { key: "description", label: "Description" },
      { key: "status", label: "Status", type: "status" },
      { key: "deadline", label: "Deadline", type: "date" },
    ],
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
    onView: (row) => alert(`Viewing task: ${row.title}`),
    onEdit: (row) => alert(`Editing task: ${row.title}`),
    onDelete: (row) => alert(`Deleting task: ${row.title}`),
    
  };

  return (
    <div className="p-4">
      <DynamicTable config={tableConfig} />
    </div>
  );
};

export default UserTasksPage;
