import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ChatInput() {
  return (
    <div>
      <div className="bg-white border border-slate-200 flex flex-col">
        <div>
          <textarea
            rows={3}
            className="bg-white border-0 w-full"
          ></textarea>{" "}
        </div>
        <div className="items-end text-right p-2 flex flex-row-reverse gap-2">
          <button
            className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm flex gap-2 hover:bg-white"
          >
            <TrashIcon className="text-slate-600 h-5 w-5" />{" "}
            <span>Clear Chat</span>
          </button>
          <button
            className="px-3 py-1 bg-slate-950 text-slate-50 border border-black rounded-lg text-sm flex gap-2 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-900"
          >
            <PaperAirplaneIcon className="text-slate-50 h-5 w-5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
