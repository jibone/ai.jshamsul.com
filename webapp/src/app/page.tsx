"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function checkBrowser() {
  let raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : 0;
}

function BrowserError() {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error: Browser not supported.
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Your browser is not supported. Please switch to Chrome (
              <a
                href="https://www.google.com/chrome/dev/?extra=devchannel"
                className="underline"
              >
                Dev
              </a>{" "}
              or{" "}
              <a
                href="https://www.google.com/chrome/canary/"
                className="underline"
              >
                Canary
              </a>
              )
            </p>
            <p className="mt-4">Please check the requirements steps below.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeVerError() {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error: Chrome version not supported.
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Please update your chrome to version 127 or later, or switch to
              Chrome{" "}
              <a
                href="https://www.google.com/chrome/dev/?extra=devchannel"
                className="underline"
              >
                Dev
              </a>{" "}
              or{" "}
              <a
                href="https://www.google.com/chrome/canary/"
                className="underline"
              >
                Canary
              </a>
            </p>
            <p className="mt-4">Please check the requirements steps below.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptApiError() {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error: Prompt API not enabled
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Prompt API is an experimental Chrome flag that needs to be enable.
            </p>
            <p className="mt-4">Please check the requirements steps below.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiNotReadyError({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error: Fail to load AI Model
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>Failed with the following message: {message}</p>
            <p className="mt-4">Please check the requirements steps below.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllGood() {
  return (
    <div className="rounded-md bg-green-50 p-4 border border-green-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            All good: System check pass
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Click start to begin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequirementsInfo() {
  return (
    <div className="mt-4">
      <div className="text-black font-semibold py-2">Requirement Steps</div>

      <ul className="border-b border-slate-200">
        <li className="border-t border-slate-200 py-2 flex gap-2">
          <div>
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          <div>
            <div className="font-medium">Chrome version &gt; 127</div>
            <div className="text-md text-slate-500">The demo</div>
          </div>
        </li>

        <li className="border-t border-slate-200 py-2 flex gap-2">
          <div>
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          <div>
            <div className="font-medium">
              chrome://flags/#prompt-api-for-gemini-nano
            </div>
            <div className="text-md text-slate-500">
              Select &apos;Enable&apos;
            </div>
          </div>
        </li>

        <li className="border-t border-slate-200 py-2 flex gap-2">
          <div>
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          <div>
            <div className="font-medium">
              chrome://flags/#optimization-guide-on-device-model
            </div>
            <div className="text-md text-slate-500">
              Select &apos;Enabled BypassPrefRequirement&apos;
            </div>
          </div>
        </li>

        <li className="border-t border-slate-200 py-2 flex gap-2">
          <div>
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          <div>
            <div className="font-medium">chrome://components</div>
            <div className="text-md text-slate-500">
              Click &apos;Check for Update&apos; on Optimization Guide On Device
              Model to download the model. If you don&apos;t see Optimization
              Guide, ensure you have set the flags correctly above, relaunch
              your browser, and refresh the page.
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default function Home() {
  const [init, setInit] = useState(true);
  const [validBrowser, setValidBrower] = useState(false);
  const [validChromeVer, setValidChromeVer] = useState(false);
  const [validPromptAPI, setValidPromptAPI] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  const [aiModelError, setAiModelError] = useState("");

  useEffect(() => {
    // check for chrome browser
    const version = checkBrowser();
    if (version) {
      setValidBrower(true);
    }
    // check for chrome version
    if (version > 127) {
      setValidChromeVer(true);
    }

    // check if window.ai is activated
    if ("ai" in globalThis) {
      setValidPromptAPI(true);
    }

    // check if LLM model is loaded
    const checkAI = async () => {
      try {
        // @ts-expect-error
        return await ai?.canCreateGenericSession();
      } catch {}
    };
    checkAI().then((state) => {
      if (state === "readily") {
        setAiReady(true);
        localStorage.setItem("system-check", "pass");
      } else {
        setAiModelError(state);
      }
    });

    setInit(false);
  }, [validBrowser, validChromeVer, validPromptAPI, aiReady]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-100 border border-slate-200 p-4 w-5/6 lg:w-3/6">
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-8 w-8 text-purple-500" />{" "}
          <span className="ml-2 text-slate-600 leading-relaxed font-semibold">
            ai.jshamsul.com
          </span>
        </div>
        <div className="prose prose-slate !max-w-none">
          <p>
            Google announced that they are putting Gemini Nano — a lightweight
            Gemini Based LLM into Chrome and will be exposing the interface on
            the browser with <code>window.ai</code>.
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
            provider, which makes it easy to call the Gemini Nano Prompt API
            from the browser.
          </p>
          <p>
            Follow{" "}
            <a href="https://x.com/jibone" target="_blank">
              @jibone
            </a>{" "}
            on Twitter (now known as X) for more updates.
          </p>
        </div>

        {init ? null : (
          <div className="mt-4">
            {!validBrowser ? (
              <BrowserError />
            ) : !validChromeVer ? (
              <ChromeVerError />
            ) : !validPromptAPI ? (
              <PromptApiError />
            ) : !aiReady ? (
              <AiNotReadyError message={aiModelError} />
            ) : (
              <AllGood />
            )}
          </div>
        )}

        {!init && !aiReady ? <RequirementsInfo /> : null}

        <div className="mt-4">
          {aiReady ? (
            <Link
              href="/dashboard"
              className="py-2 px-3 bg-slate-900 rounded-md text-slate-200 flex w-fit items-center hover:bg-slate-900/80"
            >
              Start <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/about"
              className="py-2 px-3 bg-slate-600 rounded-md text-slate-200 flex w-fit items-center hover:bg-slate-900/80"
            >
              Read more about it <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
