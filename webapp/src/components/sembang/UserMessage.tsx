import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-fit">
        <UserIcon className="h-5 w-5 text-slate-600 mt-2" />
      </div>
      <div className="w-fit p-3 bg-slate-950 text-slate-200 border border-slate-200 rounded-lg">
        {message}
      </div>
    </div>
  )
}
