import Layout from "@/ui/Layout";

export default function Image() {
  return (
    <Layout title="Image" sideNavItem="Image">
      <div className="prose prose-slate">
        <p>Work in progress</p>
        <p>
          My idea for this is a tool that can understand a given image, pick up
          important things from the image, or generate a new one based on the
          prompt.
        </p>
        <p>
          p/s: The current Gemini Nano embedded in Chrome, does not have these
          capabilities. Perhaps I need to leverage a different model.
        </p>
      </div>
    </Layout>
  );
}
