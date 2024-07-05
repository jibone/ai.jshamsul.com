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

export default function SummerizeText() {
  const [isSummerizing, setIsSummerizing] = useState(false);
  const [result, setResult] = useState<CoreMessage[]>([]);
  const [textRaw, setTextRaw] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const syscheck = localStorage.getItem("system-check");
    if (syscheck === undefined || syscheck !== "pass") {
      router.push("/");
    }
  }, [router]);

  const handleSummerize = async () => {
    setIsSummerizing(true);
    const text = textRaw;
    let modelPrompt = `Write a summary for the following text: ${text}`;
    if (userPrompt !== "") {
      modelPrompt = `${userPrompt} from the following text: ${text}`;
    }

    try {
      const { textStream } = await streamText({
        model: chromeai("text", {}),
        messages: [
          {
            role: "user",
            content: modelPrompt,
          },
        ],
      });
      for await (const textPart of textStream) {
        setResult([
          {
            role: "assistant",
            content: textPart,
          },
        ]);
      }
    } catch (e) {
      setError(true);
      setErrorMsg(`${e}`);
    }
  };

  return (
    <Layout title="Summarise Text" sideNavItem="Summarize">
      <div className="mb-4">
        <div className="font-medium text-slate-700">
          Paste text to Summarise
        </div>
        <textarea
          onChange={(e) => setTextRaw(e.target.value)}
          className="mt-4 w-5/6 h-fit p-2 rounded-md border border-slate-300"
          rows={10}
          placeholder="..."
        ></textarea>
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

      {result[0]?.content !== undefined ? (
        <div className="px-3 py-2 mb-4 w-fit bg-slate-100 rounded-lg border border-slate-200">
          <MemoizeReactMarkdown className={"prose"}>
            {`${result[0]?.content}`}
          </MemoizeReactMarkdown>
        </div>
      ) : null}

      {error ? (
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

      {result[0]?.content !== undefined ? (
        <div className="mb-10">
          <a
            href="/summarize/text"
            className="px-3 py-2 rounded-lg bg-slate-900 text-slate-100 hover:bg-slate-900/80"
          >
            Summarise another
          </a>
        </div>
      ) : null}

      {isSummerizing ? null : (
        <>
          <div className="mb-4">
            <div className="font-medium text-slate-700">
              (optional) Add extra instruction for the summarisation.
            </div>
            <textarea
              onChange={(e) => setUserPrompt(e.target.value)}
              className="mt-4 w-5/6 h-fit p-2 rounded-md border border-slate-300 placeholder:text-slate-400"
              rows={3}
              placeholder="Summarise the text above"
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              onClick={handleSummerize}
              className="px-4 py-2 rounded-md bg-slate-900 text-slate-100 hover:bg-slate-700"
            >
              Summarise
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
