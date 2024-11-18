"use client"

import ChatInput from "@/components/chat/ChatInput";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatTitle from "@/components/chat/Title";
import LayoutContainer from "@/components/Layout";
import { SembangMallamProvider } from "@/contexts/SembangMallamContext";

export default function SembangMallamChat() {
  return (
    <LayoutContainer>
      <ChatTitle title="Sembang Mallam 🌙" infoPage="#" />

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
