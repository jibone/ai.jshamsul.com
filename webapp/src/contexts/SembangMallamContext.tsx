import { createContext, useContext, useState } from "react";

interface SembangContextInterface {
  chatInput: string;
  setChatInput: (value: string) => void;
}

const SembangMallamContext = createContext<SembangContextInterface | undefined>(undefined)

export function SembangMallamProvider({ children }: { children: React.ReactNode }) {
  const [chatInput, setChatInput] = useState("")

  return (
    <SembangMallamContext.Provider
      value={{
        chatInput,
        setChatInput
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
