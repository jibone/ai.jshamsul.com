import Layout from "@/ui/Layout";

export default function Dashboard() {
  return (
    <Layout title="Dashboard" sideNavItem="Dashboard">
      <div className="prose prose-slate">
        <p>
          <strong>Work in progress</strong>
        </p>
        <p>
          My idea is for a dashboard like page with all your usage stats and
          links to quick tools.
        </p>
      </div>
    </Layout>
  );
}
