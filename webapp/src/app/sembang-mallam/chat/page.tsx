"use client"

import ChatInput from "@/components/sembang/ChatInput";
import ChatWindow from "@/components/sembang/ChatWindow";
import ChatTitle from "@/components/sembang/Title";
import LayoutContainer from "@/components/Layout";
import { SembangMallamProvider } from "@/contexts/SembangMallamContext";

export default function SembangMallamChat() {
  return (
    <LayoutContainer>
      <ChatTitle title="Sembang Mallam 🌙" infoPage="/sembang-mallam/info" />

      <div className="w-full h-screen -mt-64">
        <div className="pt-64 mb-5 h-full flex flex-col justify-end">
          <SembangMallamProvider>
            <ChatWindow />
            <ChatInput />
          </SembangMallamProvider>
        </div>
      </div>
    </LayoutContainer>
  )
}
