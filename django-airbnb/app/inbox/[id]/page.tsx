import { useEffect, useState } from "react"

import apiService from "@/app/sevices/apiService"
import { getUserId } from "@/app/lib/actions"
import { UserType } from "../page"
import { getAccessToken } from "@/app/lib/actions"
import ConversationDetail from "@/app/components/inbox/ConversationDetail"

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType
}

const ConversationPage = async ({ params }: { params: {id: string }}) => {
  const userId = await getUserId();
  const token = await getAccessToken();

  if (!userId || !token) {
    return (
        <main className="max-w-[1500px] max-auto px-6 py-12">
            <p>You need to be authenticated...</p>
        </main>
    )
  }

  const conversation = await apiService.get(`/api/chat/${params.id}/`)

  console.log("🟡", conversation);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <ConversationDetail 
          token={token} 
          userId={userId} 
          conversation={conversation.conversation}
          messages={conversation.messages}
        />
    </main>
  )
}

export default ConversationPage