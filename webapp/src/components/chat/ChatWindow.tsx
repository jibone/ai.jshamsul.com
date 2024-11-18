import AgentMessage from "./AgentMessage";
import UserMessage from "./UserMessage";

export default function ChatWindow() {
  return (
    <div className="flex-1 overflow-auto flex flex-col-reverse">
      <div className="flex flex-col gap-0">

        <UserMessage message={"this message"} />

        <AgentMessage message={"this is a test"} />

      </div>
    </div>
  )
}
