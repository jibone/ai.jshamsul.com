import { SparklesIcon } from "@heroicons/react/24/outline";

export default function AgentMessage({ message }: { message: string }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-fit">
        <SparklesIcon className="h-5 w-5 text-slate-600 mt-2" />
      </div>
      <div className="w-fit p-3 bg-white border border-slate-200 rounded-lg">
        {message}
      </div>
    </div>
  )
}
