"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CoreMessage, streamText } from "ai";
import { chromeai } from "chrome-ai";
import ReactMarkdown, { Options } from "react-markdown";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Layout from "@/ui/Layout";

const MemoizeReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

export default function SummarizeWeb() {
  const [urlInput, setUrlInput] = useState("");
  const [isSummerizing, setIsSummerizing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [text, setText] = useState<CoreMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const syscheck = localStorage.getItem("system-check");
    if (syscheck === undefined || syscheck !== "pass") router.push("/");
  }, [router]);

  const handleSummerizeUrl = async () => {
    setIsSummerizing(true);
    setText([]);

    // fatch the wabpage content
    try {
      const response = await fetch(`/api/clean?url=${urlInput}`);
      if (!response.ok) {
        setIsError(true);
        setErrorMsg("Error fetching webpage");
      } else {
        const data = await response.text();
        try {
          const { textStream } = await streamText({
            model: chromeai("text", { topK: 1000000 }),
            system: `${data}`,
            prompt: `Write a summary. Mentioned what it is about. List down key points.`,
          });
          setIsSummerizing(true);
          for await (const textPart of textStream) {
            setText([
              {
                role: "assistant",
                content: textPart,
              },
            ]);
          }
        } catch (e) {
          setIsError(true);
          setErrorMsg(`${e}`);
        }
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMsg(`${err.message}`);
    }
  };

  return (
    <Layout title="Summarize Webpage" sideNavItem="Summarize">
      <div className="mb-4">
        <div className="font-medium text-slate-700">
          Paste text to Summarise
        </div>
        <input
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="http://..."
          className="w-full mt-2 border border-slate-300 rounded-lg"
        />
        <button
          onClick={handleSummerizeUrl}
          className="py-2 px-3 mt-2 bg-slate-900 text-slate-100 rounded-lg hover:bg-slate-900/90"
        >
          Summarise
        </button>
      </div>

      {isSummerizing ? (
        <div className="flex">
          <div className="mr-2">
            <SparklesIcon className="h-6 w-6 text-purple-500 aspect-square" />
          </div>
          <div className="mb-4">
            <div>Summarising</div>
          </div>
        </div>
      ) : null}

      {isSummerizing && text[0]?.content !== undefined ? (
        <div className="px-3 py-2 mb-4 w-fit bg-slate-100 rounded-lg border border-slate-200">
          <MemoizeReactMarkdown className={"prose"}>
            {`${text[0]?.content}`}
          </MemoizeReactMarkdown>
        </div>
      ) : null}

      {isError ? (
        <div className="p-2 mb-4 rounded-lg border border-red-300 bg-white flex">
          <div className="w-fit mr-2">
            <ExclamationCircleIcon className="text-red-500 h-6 w-6" />
          </div>
          <div className="flex-grow">
            <div className="text-red-500 font-semibold">Error:</div>
            <div className="text-red-500/80">{errorMsg}</div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 mb-10">.</div>
    </Layout>
  );
}
