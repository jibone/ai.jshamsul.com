"use client";

import { useState, useEffect } from "react";

export default function BrowserCheck() {
  const [checking, setChecking] = useState(true);
  const [promptAPIEnabled, setPromptAPIEnabled] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  // check if window.ai is avialable
  useEffect(() => {
    if ("ai" in globalThis) {
      setPromptAPIEnabled(true);
      setChecking(false);
    }

    const checkAI = async () => {
      try {
        // @ts-expect-error
        return await ai?.canCreateTextSession();
      } catch {}
    };
    checkAI().then((state) => {
      if (state === "readily") {
        setModelReady(true);
      }
    });
  }, []);

  if (promptAPIEnabled && modelReady) {
    return (
      <div className="text-left w-fit text-xs px-2 py-1 bg-green-50 border border-green-200 rounded-full text-green-900">
        Model Ready
      </div>
    );
  }

  if (!promptAPIEnabled && !checking) {
    return (
      <div className="text-left w-fit text-xs px-2 py-1 bg-red-50 border border-red-200 rounded-full text-red-900">
        Error{" "}
        <a href="/chrome-ai/info" className="underline">
          info
        </a>
      </div>
    );
  }

  if (!modelReady) {
    return (
      <div className="text-left w-fit text-xs px-2 py-1 bg-red-50 border border-red-200 rounded-full text-red-900">
        Error{" "}
        <a href="/chrome-ai/info" className="underline">
          Check settings
        </a>
      </div>
    );
  }

  return (
    <div className="text-left w-fit text-xs px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-900">
      Checking browser
    </div>
  );
}
