"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import {
  TrashIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import LayoutContainer from "@/components/Layout";
import BrowserCheck from "@/components/chromeai/BrowserCheck";

type Message = {
  role: string;
  content: string;
};

const MemoizeReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

export default function ChromeAIChat() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiSession, setAISession] = useState<any>();
  const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
  const [clearBtnDisabled, setClearBtnDisabled] = useState(false);

  useEffect(() => {
    // @ts-expect-error
    const session = ai.createTextSession();
    session.then((t: any) => {
      setAISession(t);
    });
  }, [setAISession]);

  const handleSend = async () => {
    const userPrompt = chatInput;
    setChatInput("");
    setSendBtnDisabled(true);
    // insert chat into message
    setMessages([...messages, { role: "user", content: userPrompt }]);

    const messageList = [...messages, { role: "user", content: userPrompt }];

    const stream = aiSession.promptStreaming(userPrompt);
    setMessages([
      ...messageList,
      { role: "assistant", content: "Thinking..." },
    ]);
    for await (const chunk of stream) {
      setMessages([...messageList, { role: "assistant", content: chunk }]);
    }

    setSendBtnDisabled(false);
  };

  const handleClearChat = () => {
    setClearBtnDisabled(true);

    // clear messages
    setMessages([]);

    // reset the session
    aiSession.destroy();
    // @ts-expect-error
    const session = window.ai.createTextSession();
    session.then((t: any) => {
      setAISession(t);
    });

    setClearBtnDisabled(false);
  };

  return (
    <LayoutContainer>
      <div className="mb-5 flex gap-4">
        <h1 className="text-black font-semibold py-1">
          Chat with Chrome Embadded LLM
        </h1>
        <a
          href="/chrome-ai/info"
          className="text-sm py-1 px-2 border border-slate-200 bg-slate-100 rounded-lg hover:bg-slate-900 hover:text-slate-100"
        >
          More Info
        </a>
      </div>
      <div className="w-full h-screen -mt-64">
        <div className="pt-64 mb-5 h-full flex flex-col justify-end">
          <div className="flex-1 overflow-auto flex flex-col-reverse">
            <div className="flex flex-col gap-0">
              {messages.map((chat, inx) => {
                if (chat.role === "user") {
                  return <UserChatMessage key={inx} chat={chat} />;
                }

                if (chat.role === "assistant") {
                  return <AssistantChatMessage key={inx} chat={chat} />;
                }
              })}
            </div>
          </div>
          <div>
            <div className="bg-white border border-slate-200 flex flex-col">
              <div>
                <textarea
                  rows={3}
                  onChange={(e) => setChatInput(e.target.value)}
                  value={chatInput}
                  className="bg-white border-0 w-full"
                ></textarea>{" "}
              </div>
              <div className="items-end text-right p-2 flex flex-row-reverse gap-2">
                <button
                  onClick={handleClearChat}
                  disabled={clearBtnDisabled}
                  className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm flex gap-2 hover:bg-white"
                >
                  <TrashIcon className="text-slate-600 h-5 w-5" />{" "}
                  <span>Clear Chat</span>
                </button>
                <button
                  onClick={handleSend}
                  disabled={sendBtnDisabled}
                  className="px-3 py-1 bg-slate-950 text-slate-50 border border-black rounded-lg text-sm flex gap-2 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-900"
                >
                  {sendBtnDisabled ? (
                    <>
                      <SparklesIcon className="text-slate-900 h-5 w-5" />
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="text-slate-50 h-5 w-5" />
                      <span>Send</span>
                    </>
                  )}
                </button>
                <div className="grow justify-start">
                  <BrowserCheck />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

// Components
// [TODO] maybe move to components file,
// but then again I'm only using these here 🤔

function UserChatMessage({ chat }: { chat: Message }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-fit">
        <UserIcon className="h-5 w-5 text-slate-600 mt-2" />
      </div>
      <div className="w-fit p-3 bg-slate-950 text-slate-200 border border-slate-200 rounded-lg">
        {chat.content as string}
      </div>
    </div>
  );
}

function AssistantChatMessage({ chat }: { chat: Message }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-fit">
        <SparklesIcon className="h-5 w-5 text-slate-600 mt-2" />
      </div>
      <div className="w-fit p-3 bg-white border border-slate-200 rounded-lg">
        <MemoizeReactMarkdown className={"prose-custom !w-full -mt-6 -mb-6"}>
          {chat.content as string}
        </MemoizeReactMarkdown>
      </div>
    </div>
  );
}
