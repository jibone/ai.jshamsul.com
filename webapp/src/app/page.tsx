import LayoutContainer from "@/components/Layout";

export default function Home() {
  return (
    <LayoutContainer>
      <div className="prose-custom">
        <div className="mt-10 mb-20">
          <p>
            Nothing here is production ready. Please do not use for actual work.
            This is just an AI playground, experimenting with LLMs,
            Transformers, and other goodies.
          </p>
        </div>

        <h1>Experiments</h1>

        <div className="mb-14">
          <a href="/sembang-mallam/chat">Sembang MaLLaM</a>
          <p className="!-mt-0">
            Chat with different dialects using Mesolitica <strong>MaLLaM 🌙</strong>
          </p>
        </div>

        <div className="mb-14">
          <a href="/chrome-ai/chat">Chrome-AI Chat</a>
          <p className="!-mt-0">
            Chat with Gemini Nano, a lightweight Gemini Based LLM into Chrome.
          </p>
        </div>
      </div>
    </LayoutContainer>
  );
}
