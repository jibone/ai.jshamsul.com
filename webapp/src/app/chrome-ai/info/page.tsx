import LayoutContainer from "@/components/Layout";
import BrowserCheck from "@/components/chromeai/BrowserCheck";

export default function ChromeAIInfoPage() {
  return (
    <LayoutContainer>
      <div className="prose-custom mt-16">
        <div className="mb-8">
          <a href="/chrome-ai/chat">&larr; Chat With Chrome</a>
        </div>

        <h1>About</h1>

        <p>
          <a href="https://developer.chrome.com/docs/ai/built-in">
            Google announced that they are putting Gemini Nano
          </a>{" "}
          — a lightweight Gemini Based LLM into Chrome and will be exposing the
          interface on the browser with <code>window.ai</code>.
        </p>

        <p>
          The feature is currently experimental in the Chrome browser. You’ll
          need to have the latest version of Chrome, probably best to try it
          either with{" "}
          <a href="https://www.google.com/chrome/dev/?extra=devchannel">dev</a>{" "}
          or <a href="https://www.google.com/chrome/canary/">canary</a> build,
          and you’ll need to turn on certain flags.
        </p>

        <BrowserCheck />

        <p>
          If the above check says error, follow the instruction below to enable
          this feature on your Chrome.
        </p>

        <ul>
          <li>
            <u>chrome://flags/#prompt-api-for-gemini-nano</u>: Enabled
          </li>
          <li>
            <u>chrome://flags/#optimization-guide-on-device-model</u>: Enabled
            BypassPrefRequirement
          </li>
          <li>
            <u>chrome://components/</u>: Click Optimization Guide On Device
            Model to download the model.
          </li>
        </ul>

        <h2>The API</h2>

        <p>The APIs are actually quite simple.</p>

        <p>
          Check if the browser is supported.
          <pre className="!-mt-0">
            <code>await window.ai.canCreateTextSession();</code>
          </pre>
        </p>

        <p>
          Create a text session.
          <pre className="!-mt-0">
            <code>const session = await window.ai.createTextSession();</code>
          </pre>
        </p>

        <p>
          Execute the prompt.
          <pre className="!-mt-0">
            <code>{`await session.prompt("Why is Ruby better than Python?");`}</code>
          </pre>
        </p>

        <p>
          Execute the prompt and returns a ReadableStream object
          <pre className="!-mt-0">
            <code>{`await session.promptStreaming("Why is Ruby better than Python?");`}</code>
          </pre>
        </p>
      </div>
    </LayoutContainer>
  );
}
