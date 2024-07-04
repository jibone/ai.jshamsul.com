import Layout from "@/ui/Layout";

export default function Workflow() {
  return (
    <Layout title="Workflow (Work in progress)" sideNavItem="Workflow">
      <div className="prose prose-slate">
        <p>Work in progress</p>
        <p>
          A tool to create a workflow like interface, when an output from one
          thing is the input for another process, until it reaches the final
          stage.
        </p>
      </div>
    </Layout>
  );
}
