"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CoreMessage, streamText } from "ai";
import { chromeai } from "chrome-ai";
import ReactMarkdown, { Options } from "react-markdown";
import { UserCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Layout from "@/ui/Layout";

const MemoizeReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

function UserMessage({ message }: { message: CoreMessage }) {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="grid gap-1 bg-slate-900 rounded-lg p-3 max-w-[75%] text-slate-200">
        {/* @ts-expect-error */}
        <div className="">{message.content}</div>
      </div>
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 border">
        <UserCircleIcon className="aspect-square text-slate-400 h-full w-full" />
      </span>
    </div>
  );
}

function AiMessage({ message }: { message: CoreMessage }) {
  return (
    <div className="flex items-start gap-4">
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        <SparklesIcon className="aspect-square text-purple-500 h-full w-full" />
      </span>
      <div className="grid gap-1 bg-slate-100 rounded-lg p-3 max-w-[75%]">
        <div className="">
          <MemoizeReactMarkdown className={"prose"}>
            {/* @ts-expect-error */}
            {message.content}
          </MemoizeReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default function Chat() {
  const [init, setInit] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const scrollToBottom = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // System check
    const syscheck = localStorage.getItem("system-check");

    if (syscheck === undefined || syscheck !== "pass") {
      router.push("/");
    }

    if (!init) {
      const initMessage: CoreMessage[] = [
        {
          content:
            "You are an AI assistant. Write a very short greeting for the user.",
          role: "system",
        },
      ];
      setMessages(initMessage);

      const welcome = async () => {
        try {
          const { textStream } = await streamText({
            model: chromeai("text", {}),
            prompt: initMessage[0].content as string,
          });
          for await (const textPart of textStream) {
            setMessages([
              {
                role: "assistant",
                content: textPart.replace(/model:\\n/i, ""),
              },
            ]);
          }
        } catch (e) {
          console.log(e);
        }
      };
      welcome();
      setInit(true);
    }
  }, [init, router, messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ];
    setInput("");
    setMessages(newMessage);
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });

    try {
      const { textStream } = await streamText({
        model: chromeai("text", {}),
        messages: newMessage,
      });
      for await (const textPart of textStream) {
        setMessages([
          ...newMessage,
          { role: "assistant", content: textPart.replace(/model:/i, "") },
        ]);
        scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout title="Converse with LLM" sideNavItem="Chat">
      <div className="flex flex-col min-h-full justify-end">
        <div className="flex-1 overflow-auto flex flex-col-reverse">
          <div className="px-4 py-6 space-y-4">
            {messages.length > 0 ? (
              messages.map((m, i) =>
                m.role === "user" ? (
                  <UserMessage key={i} message={m} />
                ) : m.role === "assistant" ? (
                  <AiMessage key={i} message={m} />
                ) : null,
              )
            ) : (
              <div>Initializing LLM...</div>
            )}
          </div>
        </div>
        <div className="border-t px-4 py-2">
          <form
            className="relative w-full flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <textarea
              onChange={(e) => setInput(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 focus:outline-none"
              placeholder="Type your message..."
              value={input}
            ></textarea>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-100 hover:bg-slate-900/90 h-10 w-10"
              type="submit"
            >
              <PaperAirplaneIcon className="h-6 w-6 text-slate-100" />
            </button>
          </form>
        </div>
      </div>

      <section ref={scrollToBottom} />
    </Layout>
  );
}
