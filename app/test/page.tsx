import CustomersTable from "@/components/tables/CustomersTable";
import ProjectsTable from "@/components/tables/ProjectsTable";
const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen" dir="rtl">
      <ProjectsTable />
    </div>
  );
};

export default page;
