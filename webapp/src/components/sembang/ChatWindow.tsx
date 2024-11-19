import AgentMessage from "./AgentMessage";
import UserMessage from "./UserMessage";
import { useSembangMallamContext } from "@/contexts/SembangMallamContext";

export default function ChatWindow() {
  const { messages } = useSembangMallamContext()

  return (
    <div className="flex-1 overflow-auto flex flex-col-reverse">
      <div className="flex flex-col gap-0">
        {messages.map((chat: any) => {
          if (chat.role === "user") {
            return <UserMessage key={chat.id} message={chat.content} />
          }

          if (chat.role === "assistant") {
            return <AgentMessage key={chat.id} message={chat.content} />
          }
        })}
      </div>
    </div>
  )
}
