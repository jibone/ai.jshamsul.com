import { createContext, useContext } from "react";
import { useChat } from "ai/react";

interface SembangContextInterface {
  messages: any;
  setMessages: any;
  input: any;
  handleInputChange: any;
  handleSubmit: any;

}

const SembangMallamContext = createContext<SembangContextInterface | undefined>(undefined)

export function SembangMallamProvider({ children }: { children: React.ReactNode }) {
  const { messages, setMessages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/sembang-mallam"
  });

  // const [chatInput, setChatInput] = useState("")

  return (
    <SembangMallamContext.Provider
      value={{
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit
      }}
    >
      {children}
    </SembangMallamContext.Provider>
  )
}

export function useSembangMallamContext() {
  const context = useContext(SembangMallamContext)
  if (!context) {
    throw new Error("useSembangMallamContext must be within a SembangMallamProvider")
  }
  return context;
}
