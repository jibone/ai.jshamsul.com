"use client";

import React, { KeyboardEvent } from "react";
import { useChat } from "ai/react";
import ReactMarkdown, { Options } from "react-markdown";
import {
  UserIcon,
  SparklesIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import LayoutContainer from "@/components/Layout";
import { Weather } from "@/components/genui/weather";
import { CryptoChartDisplay } from "@/components/genui/CryptoChart";
import { StockChartDisplay } from "@/components/genui/StockChart";
import { YoutubePlayer } from "@/components/genui/YoutubePlayer";

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

export default function GenUIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents a new line
      (event.target as HTMLTextAreaElement).form?.requestSubmit(); // Submit the form
    }
  };

  return (
    <LayoutContainer>
      <div className="mb-5 flex gap-4">
        <h1 className="text-black font-semibold py-1">
          Generative UI Experiment.
        </h1>
        <a
          href="/gen-ui/info"
          className="text-sm py-1 px-2 border border-slate-200 bg-slate-100 rounded-lg hover:bg-slate-900 hover:text-slate-100"
        >
          More Info
        </a>
      </div>

      <div className="w-full h-screen -mt-64">
        <div className="pt-64 mb-5 h-full flex flex-col justify-end">
          <div className="flex-1 overflow-auto flex flex-col-reverse">
            <div className="flex flex-col gap-0">
              {messages.map((chat) => {
                if (chat.role === "user") {
                  return <UserChatMessage key={chat.id} chat={chat} />;
                }

                if (chat.role === "assistant") {
                  return <AssistantChatMessage key={chat.id} chat={chat} />;
                }
              })}
            </div>
          </div>

          <div>
            <div className="bg-white border border-slate-200 flex flex-col">
              <form onSubmit={handleSubmit}>
                <div>
                  <textarea
                    rows={3}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="bg-white border-0 w-full"
                  ></textarea>{" "}
                </div>
                <div className="items-end text-right p-2 flex flex-row-reverse gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-slate-950 text-slate-50 border border-black rounded-lg text-sm flex gap-2 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-900"
                  >
                    <>
                      <PaperAirplaneIcon className="text-slate-50 h-5 w-5" />
                      <span>Send</span>
                    </>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

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

function AssistantChatMessage({ chat }: { chat: any }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-fit">
        <SparklesIcon className="h-5 w-5 text-slate-600 mt-2" />
      </div>

      <>
        {chat.toolInvocations?.map((toolInvocation: any) => {
          const { toolName, toolCallId, state } = toolInvocation;

          if (state === "result") {
            if (toolName === "displayWeather") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId}>
                  <Weather {...result} />
                </div>
              );
            }
            if (toolName === "displayCryptoChart") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId} className="w-full mr-4">
                  <CryptoChartDisplay {...result} />
                </div>
              );
            }
            if (toolName === "displayStockChart") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId} className="w-full mr-4 h-500px">
                  <StockChartDisplay {...result} />
                </div>
              );
            }
            if (toolName === "displayLofiGirl") {
              const { result } = toolInvocation;
              return (
                <div key={toolCallId} className="w-full mr-4">
                  <YoutubePlayer {...result} />
                </div>
              );
            }
          } else {
            return (
              <div key={toolCallId}>
                {toolName === "displayWeather" ? (
                  <div>Loading weather...</div>
                ) : null}
                {toolName === "displayCryptoChart" ? (
                  <div>Loading crypto chart...</div>
                ) : null}
                {toolName === "displayStockChart" ? (
                  <div>Loading stock chart...</div>
                ) : null}
                {toolName === "displayLofiGirl" ? (
                  <div>Loading lofi girl stream...</div>
                ) : null}
                {toolName === "displayCryptoNews" ? (
                  <div>Getting the latest Alphas...</div>
                ) : null}
              </div>
            );
          }
        })}
      </>

      {chat.content === "" ? (
        ""
      ) : (
        <div className="w-fit p-3 bg-white border border-slate-200 rounded-lg">
          <MemoizeReactMarkdown className={"prose-custom !w-full -mt-6 -mb-6"}>
            {chat.content as string}
          </MemoizeReactMarkdown>
        </div>
      )}
    </div>
  );
}
