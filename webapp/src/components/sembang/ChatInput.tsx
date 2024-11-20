import { KeyboardEvent, useState } from "react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSembangMallamContext } from "@/contexts/SembangMallamContext";
import { sembangSystemPrompt } from "@/config/sembangSystemPrompt";

export default function ChatInput() {
  const [option, setOption] = useState(sembangSystemPrompt[0].prompt)
  const { setMessages, input, handleInputChange, handleSubmit } = useSembangMallamContext()

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents a new line
      (event.target as HTMLTextAreaElement).form?.requestSubmit(); // Submit the form
    }
  };

  const handleClearChat = () => {
    setMessages([])
  }

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(sembangSystemPrompt[parseInt(event.target.value)].prompt)
  }

  return (
    <div>
      <div className="bg-white border border-slate-200 flex flex-col">
        <form onSubmit={event => {
          handleSubmit(event, {
            body: {
              promptOpt: option
            }
          })
        }}>
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
              className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm flex gap-2 hover:bg-white"
              onClick={handleClearChat}
            >
              <TrashIcon className="text-slate-600 h-5 w-5" />
            </button>
            <button
              className="px-3 py-1 bg-slate-950 text-slate-50 border border-black rounded-lg text-sm flex gap-2 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-900"
            >
              <PaperAirplaneIcon className="text-slate-50 h-5 w-5" />
              <span>Send</span>
            </button>
            <div className="flex-grow">
              <select
                id="option"
                name="option"
                defaultValue={0}
                onChange={handleSelectOption}
                className="text-sm mt-2 block w-fit rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              >
                {sembangSystemPrompt.map((c, i) => (
                  <option key={i} value={i}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
