import Layout from "@/ui/Layout";

export default function About() {
  return (
    <Layout title="Experimental AI Interface Playground" sideNavItem="About">
      <div className="prose prose-slate">
        <p>
          Google announced that they are putting{" "}
          <a href="https://developer.chrome.com/docs/ai/built-in">
            Gemini Nano
          </a>{" "}
          — a lightweight Gemini Based LLM — into Chrome and will be exposing
          the interface on the browser with <code>window.ai</code>.{" "}
        </p>
        <p>
          It is currently available in the Chrome Nightly build or the Chrome
          Dev channel. You can read more about it here -{" "}
          <a
            href="https://developer.chrome.com/docs/ai/built-in"
            target="_blank"
          >
            AI on Chrome
          </a>
          .
        </p>
        <p>
          I making here some proof-of-concepts with the wide range of LLM based
          use cases. None of the thing here is guarantee to continue to work as
          the feature is experimental, and things might change in future.
        </p>
        <p>
          This demo uses the{" "}
          <a href="https://sdk.vercel.ai/docs/introduction" target="_blank">
            Vercel’s AI SDK
          </a>{" "}
          with{" "}
          <a href="https://github.com/jeasonstudio/chrome-ai" target="_blank">
            Chrome-ai
          </a>{" "}
          provider, which makes it easy to call the Gemini Nano Prompt API from
          the browser.
        </p>
        <p>
          Follow{" "}
          <a href="https://x.com/jibone" target="_blank">
            @jibone
          </a>{" "}
          on Twitter (now known as X) for more updates.
        </p>
        <p>
          -- <a href="http://jshamsul.com">jshamsul.com</a>
        </p>
      </div>
    </Layout>
  );
}
